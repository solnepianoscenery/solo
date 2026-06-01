import express from 'express';
import path from 'path';
import https from 'https';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import webpush from 'web-push';

// Web Push setup
const vapidPublicKey = 'BNMB6b4DV1-x5OR9XzmJMJKN_aqV7yDef7FQ_Y4UNZf7tWShvuE7wCppwU8DPiGOdeJ8fMcnZB04jc-GAOIevz8';
const vapidPrivateKey = 'fk0lX9lTxMjopETZsu3QOMKjsDhsot0DSgx28HWbrIw';

webpush.setVapidDetails(
  'mailto:ziepiano@gmail.com',
  vapidPublicKey,
  vapidPrivateKey
);

if (getApps().length === 0) {
  initializeApp({
    projectId: 'zinc-blade-hx6pd'
  });
}
const adminDb = getFirestore('ai-studio-33ccd0d0-1b79-4e05-9a14-8c22bb8e826d');

async function sendPushToAll(title: string, body: string, url: string) {
  console.log(`Sending Web Push: ${title} - ${body}`);
  try {
    const subsSnap = await adminDb.collection('site/streamInfo/subscriptions').get();
    const payload = JSON.stringify({ title, body, url });
    
    const promises = subsSnap.docs.map(async (doc) => {
      const sub = doc.data() as webpush.PushSubscription;
      try {
        await webpush.sendNotification(sub, payload);
      } catch (e: any) {
        if (e.statusCode === 410 || e.statusCode === 404) {
          console.log('Subscription expired, deleting', doc.id);
          await doc.ref.delete();
        } else {
          console.error('Push error:', e);
        }
      }
    });
    await Promise.all(promises);
  } catch(e) {
    console.error('Error in sendPushToAll', e);
  }
}

// Helper to poll Twitcasting
function checkTwitcastingLiveStatus(): Promise<boolean> {
  return new Promise((resolve) => {
    https.get('https://twitcasting.tv/c:ziepiano', (twitRes) => {
      let data = '';
      twitRes.on('data', (chunk) => { data += chunk; });
      twitRes.on('end', () => {
        try {
          const isLive = data.match(/data-is-onlive="(true|false)"/i);
          resolve(isLive && isLive[1] === 'true' ? true : false);
        } catch (e) {
          resolve(false);
        }
      });
    }).on('error', () => resolve(false));
  });
}

// Background poller
setInterval(async () => {
  try {
    const isLive = await checkTwitcastingLiveStatus();
    const docRef = adminDb.doc('site/streamInfo');
    const snap = await docRef.get();
    
    if (snap.exists) {
      const data = snap.data();
      const currentStatus = data?.status;
      const scheduledAt = data?.scheduledAt;
      const timeReached = data?.timeReached === true;

      if (isLive && currentStatus !== 'live') {
        // Stream has started!
        await docRef.update({
          status: 'live',
          updatedAt: FieldValue.serverTimestamp()
        });
        console.log('Stream goes LIVE - Updated Firestore');
        await sendPushToAll('ほのぼのピアノ練習部屋', '配信がスタートしました！', 'https://twitcasting.tv/c:ziepiano');
      } else if (!isLive && currentStatus === 'live') {
        // Stream has ended!
        await docRef.update({
          status: 'finished',
          timeReached: false, // reset
          updatedAt: FieldValue.serverTimestamp()
        });
        console.log('Stream ended - Updated Firestore to finished');
      } else if (!isLive && currentStatus === 'scheduled' && scheduledAt) {
        // Stream is scheduled, check if we passed the start time
        const scheduledTime = new Date(scheduledAt).getTime();
        if (Date.now() >= scheduledTime && !timeReached) {
          // Time reached, but not live yet. Send notification by updating DB
          await docRef.update({
             timeReached: true,
             updatedAt: FieldValue.serverTimestamp()
          });
          console.log('Stream scheduled time reached - Updated Firestore');
          await sendPushToAll('ほのぼのピアノ練習部屋', 'まもなく配信予定時間です！準備はいいですか？', 'https://twitcasting.tv/c:ziepiano');
        }
      }
    }
  } catch (e) {
    console.error('Background poller error:', e);
  }
}, 60000); // Check every 60 seconds

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Web push endpoints
  app.get('/api/push/public-key', (req, res) => {
    res.json({ publicKey: vapidPublicKey });
  });

  app.post('/api/push/subscribe', async (req, res) => {
    const subscription = req.body;
    try {
      // Use the endpoint as a unique ID (hash it to be safe for firestore ID)
      const id = Buffer.from(subscription.endpoint).toString('base64').replace(/[/+=]/g, '');
      await adminDb.doc(`site/streamInfo/subscriptions/${id}`).set(subscription);
      res.status(201).json({ success: true });
    } catch(e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to subscribe' });
    }
  });

  app.post('/api/push/notify-scheduled', async (req, res) => {
    const { time, url } = req.body;
    await sendPushToAll('ほのぼのピアノ練習部屋', `配信時間が更新されました！（次回予定: ${time}）`, url || 'https://twitcasting.tv/c:ziepiano');
    res.json({ success: true });
  });

  app.post('/api/push/unsubscribe', async (req, res) => {
    const { endpoint } = req.body;
    try {
      const id = Buffer.from(endpoint).toString('base64').replace(/[/+=]/g, '');
      await adminDb.doc(`site/streamInfo/subscriptions/${id}`).delete();
      res.json({ success: true });
    } catch(e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to unsubscribe' });
    }
  });

  // TwitCasting Check Proxy Route (Keep for backward compatibility)
  app.get('/api/twitcasting/status', async (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const isLive = await checkTwitcastingLiveStatus();
    res.json({ live: isLive });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

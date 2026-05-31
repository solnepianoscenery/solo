import express from 'express';
import path from 'path';
import https from 'https';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

if (getApps().length === 0) {
  initializeApp({
    projectId: 'zinc-blade-hx6pd'
  });
}
const adminDb = getFirestore('ai-studio-33ccd0d0-1b79-4e05-9a14-8c22bb8e826d');

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

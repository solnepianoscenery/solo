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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // TwitCasting Check Proxy Route
  app.get('/api/twitcasting/status', (req, res) => {
    https.get('https://twitcasting.tv/c:ziepiano', (twitRes) => {
      let data = '';
      twitRes.on('data', (chunk) => { data += chunk; });
      twitRes.on('end', () => {
        try {
          const isLive = data.match(/data-is-onlive="(true|false)"/i);
          res.json({ live: isLive && isLive[1] === 'true' });
        } catch (e) {
          res.status(500).json({ error: 'Failed to parse' });
        }
      });
    }).on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
  });

  // Admin Stream Update Proxy Route (Secure password authentication on backend)
  app.post('/api/admin/update-stream', async (req: any, res: any) => {
    const { password, status, scheduledAt } = req.body;

    if (password !== 'SolPiano') {
      return res.status(401).json({ error: 'パスワードが違います。' });
    }

    if (!status || !['scheduled', 'finished'].includes(status)) {
      return res.status(400).json({ error: 'ステータス指定が無効です。' });
    }

    try {
      const docRef = adminDb.doc('site/streamInfo');
      await docRef.set({
        status,
        scheduledAt: scheduledAt || null,
        updatedAt: FieldValue.serverTimestamp()
      });
      return res.json({ success: true });
    } catch (e) {
      console.error('Firestore Admin SDK write failed:', e);
      return res.status(500).json({ error: 'データベースの更新に失敗しました: ' + (e instanceof Error ? e.message : String(e)) });
    }
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

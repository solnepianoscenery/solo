import express from 'express';
import path from 'path';
import https from 'https';

async function startServer() {
  const app = express();
  const PORT = 3000;

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

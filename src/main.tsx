import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Generate favicon with white background
const setFavicon = () => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw logo in the center with some padding
    const padding = 24;
    const size = 256 - padding * 2;
    const scale = Math.min(size / img.width, size / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (256 - w) / 2;
    const y = (256 - h) / 2;

    ctx.drawImage(img, x, y, w, h);

    // Update favicon
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = canvas.toDataURL('image/png');
    }
  };
  img.src = 'https://i.imgur.com/3gkwo9v.png';
};

setFavicon();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

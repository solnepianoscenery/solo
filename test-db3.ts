import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
initializeApp({ projectId: 'zinc-blade-hx6pd' });
try {
  getFirestore('ai-studio-33ccd0d0-1b79-4e05-9a14-8c22bb8e826d');
  console.log("OK");
} catch(e) {
  console.log("ERROR MESSAGE: " + (e as any).message);
}

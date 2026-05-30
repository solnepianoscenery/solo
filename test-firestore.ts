import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

initializeApp({ projectId: 'zinc-blade-hx6pd' });
const adminDb = getFirestore('ai-studio-33ccd0d0-1b79-4e05-9a14-8c22bb8e826d');

async function test() {
  try {
    const docRef = adminDb.doc('site/streamInfo');
    await docRef.set({
      status: 'scheduled',
      scheduledAt: null,
      updatedAt: FieldValue.serverTimestamp()
    });
    console.log("Success");
  } catch(e) {
    console.error("ERROR:");
    console.error(e);
  }
}
test();

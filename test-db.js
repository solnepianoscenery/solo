const { getFirestore } = require('firebase-admin/firestore');
try {
  getFirestore('ai-studio-33ccd0d0-1b79-4e05-9a14-8c22bb8e826d');
  console.log("OK");
} catch(e) {
  console.log("ERROR MESSAGE: " + e.message);
}

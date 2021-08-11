const admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyCry2Zej_lOTLgX_8FjSkMRht0mIvtciUk",
  authDomain: "photobooth-7b681.firebaseapp.com",
  projectId: "photobooth-7b681",
  storageBucket: "photobooth-7b681.appspot.com",
  messagingSenderId: "637218009539",
  appId: "1:637218009539:web:9120a634b54c04064fcd76",
};
admin.initializeApp(firebaseConfig);
const db = admin.firestore();
const auth = admin.auth();

module.exports = {
  db,
  auth,
};

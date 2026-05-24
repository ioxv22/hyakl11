import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdEGJNP9MomADpjoF41SLgf4RcD_yz-iY",
  authDomain: "examrush-5fd79.firebaseapp.com",
  projectId: "examrush-5fd79",
  storageBucket: "examrush-5fd79.firebasestorage.app",
  messagingSenderId: "661733076238",
  appId: "1:661733076238:web:b8cc906aed6ca645a9fb5f",
  measurementId: "G-B9NRM01VRV"
};

// Prevent initializing multiple apps during hot reloading in Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

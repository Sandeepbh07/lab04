import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBoWdKorlgVtYaAZyLlu1Lgf_HN-wZu7n8",
  authDomain: "todo-app-c01a4.firebaseapp.com",
  projectId: "todo-app-c01a4",
  storageBucket: "todo-app-c01a4.firebasestorage.app",
  messagingSenderId: "176171384094",
  appId: "1:176171384094:web:55f4d9501dbdf6591f9d0f",
  measurementId: "G-26VPM4EZ18"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyBoUP3tcb_iHjBhaeVORjmVNcnvsv9gQe0",
  authDomain: "vite-pinia-firebase-98f5f.firebaseapp.com",
  projectId: "vite-pinia-firebase-98f5f",
  storageBucket: "vite-pinia-firebase-98f5f.appspot.com",
  messagingSenderId: "83029080414",
  appId: "1:83029080414:web:fde04381fa9ff32326b7cf"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
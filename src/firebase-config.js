// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsysXksdgyBtAA11q-F6K0n2Uqk_7rMZs",
  authDomain: "aadhaar-ocr-app.firebaseapp.com",
  projectId: "aadhaar-ocr-app",
  storageBucket: "aadhaar-ocr-app.firebasestorage.app",
  messagingSenderId: "103515940564",
  appId: "1:103515940564:web:dac25502375cf2b53cfd41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "peacejournal-ae5ee.firebaseapp.com",
  projectId: "peacejournal-ae5ee",
  storageBucket: "peacejournal-ae5ee.firebasestorage.app",
  messagingSenderId: "1044319176421",
  appId: "1:1044319176421:web:be322a4d48368e31d1760c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "codeldatabase.firebaseapp.com",
  projectId: "codeldatabase",
  storageBucket: "codeldatabase.firebasestorage.app",
  messagingSenderId: "97717270524",
  appId: "1:97717270524:web:dc9ff3e6b9179afc9ba479"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

 
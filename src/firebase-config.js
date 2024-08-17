// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3zACj81GNC-xCnSRSOkAHUMQ8ulebJtA",
  authDomain: "auth-f8584.firebaseapp.com",
  projectId: "auth-f8584",
  storageBucket: "auth-f8584.appspot.com",
  messagingSenderId: "719722791600",
  appId: "1:719722791600:web:8f1ca10164c35371113175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();
export const db=getFirestore(app)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6CBA4XALpRohwDK15PxM3H4numiSkRQY",
  authDomain: "data-app-aa930.firebaseapp.com",
  projectId: "data-app-aa930",
  storageBucket: "data-app-aa930.appspot.com",
  messagingSenderId: "949450055340",
  appId: "1:949450055340:web:9bbdc43ed0416e210ec909"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();
export const db=getFirestore(app)

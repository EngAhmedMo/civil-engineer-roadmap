import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgDeatPSz2aQS6vYwPfgJiTRJTIPzj5eM",
  authDomain: "engineer-os.firebaseapp.com",
  projectId: "engineer-os",
  storageBucket: "engineer-os.firebasestorage.app",
  messagingSenderId: "1050247370342",
  appId: "1:1050247370342:web:1c95f7329cea42742f3fa7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, signInWithEmailAndPassword, signOut, doc, setDoc, getDoc, onSnapshot };
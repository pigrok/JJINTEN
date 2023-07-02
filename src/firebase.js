// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA5XlWsgf5drHjHxlwggx2Ut3ugiYzOexw",
  authDomain: "jjinten-a738a.firebaseapp.com",
  projectId: "jjinten-a738a",
  storageBucket: "jjinten-a738a.appspot.com",
  messagingSenderId: "765825052979",
  appId: "1:765825052979:web:7207a980831be364870e46",
  measurementId: "G-9GC5PVYZQJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
//social Logins
export const signInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};
export const signInWithGithub = () => {
  const githubProvider = new GithubAuthProvider();
  return signInWithPopup(auth, githubProvider);
};

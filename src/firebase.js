// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6BWgI8rUIVukoBeD45ZxGWoCkWMP_lvA",
  authDomain: "jjinten-f5e17.firebaseapp.com",
  projectId: "jjinten-f5e17",
  storageBucket: "jjinten-f5e17.appspot.com",
  messagingSenderId: "858216545129",
  appId: "1:858216545129:web:f6f6abe69a3ee121521bf8",
  measurementId: "G-EDP8F3N6S5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

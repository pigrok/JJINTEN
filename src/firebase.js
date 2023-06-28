import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAceeTYlXO46TK2VGrPVbBzLSfslgav9yg",
  authDomain: "jjinten-74516.firebaseapp.com",
  projectId: "jjinten-74516",
  storageBucket: "jjinten-74516.appspot.com",
  messagingSenderId: "211698819925",
  appId: "1:211698819925:web:cce1269c341aa03e0605dc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

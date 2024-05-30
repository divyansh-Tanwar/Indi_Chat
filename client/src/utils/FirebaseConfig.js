import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeVbwkaDj-q398CEr2iD_jEtspLSKoq3k",
  authDomain: "indichat-286d7.firebaseapp.com",
  projectId: "indichat-286d7",
  storageBucket: "indichat-286d7.appspot.com",
  messagingSenderId: "886997959372",
  appId: "1:886997959372:web:543f30c63f3a5c6b60f869",
  measurementId: "G-70858F669V"
};

  const app=initializeApp(firebaseConfig);
  export const firebaseAuth=getAuth(app);
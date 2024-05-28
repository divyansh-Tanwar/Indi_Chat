import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDzDAGlIwKxjeUOa7exlMi1rFP8Nm4JCsE",
    authDomain: "whatsapp-clone-7005a.firebaseapp.com",
    projectId: "whatsapp-clone-7005a",
    storageBucket: "whatsapp-clone-7005a.appspot.com",
    messagingSenderId: "29285982241",
    appId: "1:29285982241:web:f80959c9c41081a121c360",
    measurementId: "G-PZYRD06PZ0"
  };

  const app=initializeApp(firebaseConfig);
  export const firebaseAuth=getAuth(app);
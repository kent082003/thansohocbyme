// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2BnOu0_JWjS4i8eBvUqQ1eDE2mCoWOEU",
  authDomain: "thansohocbyme.firebaseapp.com",
  projectId: "thansohocbyme",
  storageBucket: "thansohocbyme.firebasestorage.app",
  messagingSenderId: "770117823388",
  appId: "1:770117823388:web:9b34ebbba4af2a2e947659",
  measurementId: "G-63Z6Q38QCR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

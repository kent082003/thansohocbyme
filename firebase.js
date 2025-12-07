// firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyC2BnOu0_JWjS4i8eBvUqQ1eDE2mCoWOEU",
  authDomain: "thansohocbyme.firebaseapp.com",
  projectId: "thansohocbyme",
  storageBucket: "thansohocbyme.firebasestorage.app",
  messagingSenderId: "770117823388",
  appId: "1:770117823388:web:9b34ebbba4af2a2e947659",
  measurementId: "G-63Z6Q38QCR"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

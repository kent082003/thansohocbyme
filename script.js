// IMPORT
import { auth, db } from './firebase.js';
import { 
    signInWithEmailAndPassword, 
    signOut 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { 
    doc, getDoc, setDoc, collection, getDocs 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// LOGIN
window.login = async function () {
    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, pw);
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("editorBox").style.display = "block";
    } catch (e) {
        alert(e.message);
    }
};

// LOGOUT
window.logout = function () {
    signOut(auth).then(() => location.reload());
};

// LOAD MEANING
window.loadMeaning = async function () {
    const num = document.getElementById("numberInput").value;
    const docRef = doc(db, "meanings", num);
    const snap = await getDoc(docRef);

    document.getElementById("meaningText").value = snap.exists() 
        ? snap.data().text 
        : "";
};

// SAVE MEANING
window.saveMeaning = async function () {
    const num = document.getElementById("numberInput").value;
    const text = document.getElementById("meaningText").value;

    await setDoc(doc(db, "meanings", num), { text });
    document.getElementById("status").innerText = "Đã lưu!";
};

// script.js
import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { doc, getDoc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Attach functions to window so HTML onclick works
window.login = async function() {
    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;
    try {
        await signInWithEmailAndPassword(auth, email, pw);
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("editorBox").style.display = "block";
    } catch (e) {
        alert("Login failed: " + e.message);
    }
};

window.logout = function() {
    signOut(auth).then(() => location.reload());
};

window.loadMeaning = async function() {
    const num = document.getElementById("numberInput").value;
    if (!num) return alert("Nhập số trước khi load!");
    const docRef = doc(db, "meanings", num);
    const docSnap = await getDoc(docRef);
    document.getElementById("meaningText").value = docSnap.exists() ? docSnap.data().text : "";
};

window.saveMeaning = async function() {
    const num = document.getElementById("numberInput").value;
    const text = document.getElementById("meaningText").value;
    if (!num || !text) return alert("Nhập số và ý nghĩa trước khi lưu!");
    await setDoc(doc(db, "meanings", num), { text });
    document.getElementById("status").innerText = "Đã lưu!";
};

// Example for user page: load all meanings
window.loadAllMeanings = async function() {
    const container = document.getElementById("meanings");
    if (!container) return;
    const querySnapshot = await getDocs(collection(db, "meanings"));
    querySnapshot.forEach(docSnap => {
        container.innerHTML += `
            <h3>Số ${docSnap.id}</h3>
            <p>${docSnap.data().text}</p><hr>
        `;
    });
};

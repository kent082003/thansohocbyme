// script.js
import { auth, db } from './firebase.js'; // Import auth & db from firebase.js
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { doc, getDoc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// LOGIN
function login() {
    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, pw)
        .then(() => {
            document.getElementById("loginBox").style.display = "none";
            document.getElementById("editorBox").style.display = "block";
        })
        .catch(e => alert(e.message));
}

// LOGOUT
function logout() {
    signOut(auth).then(() => location.reload());
}

// LOAD MEANING
async function loadMeaning() {
    const num = document.getElementById("numberInput").value;
    const docRef = doc(db, "meanings", num);
    const docSnap = await getDoc(docRef);
    document.getElementById("meaningText").value = docSnap.exists() ? docSnap.data().text : "";
}

// SAVE MEANING
async function saveMeaning() {
    const num = document.getElementById("numberInput").value;
    const text = document.getElementById("meaningText").value;

    await setDoc(doc(db, "meanings", num), { text });
    document.getElementById("status").innerText = "Đã lưu!";
}

// LOAD ALL FOR USER PAGE
if (document.getElementById("meanings")) {
    const querySnapshot = await getDocs(collection(db, "meanings"));
    querySnapshot.forEach(docSnap => {
        document.getElementById("meanings").innerHTML += `
            <h3>Số ${docSnap.id}</h3>
            <p>${docSnap.data().text}</p><hr>
        `;
    });
}

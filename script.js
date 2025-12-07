import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { doc, getDoc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// LOGIN
window.login = async function() {
    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;
    try {
        await signInWithEmailAndPassword(auth, email, pw);
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("editorBox").style.display = "block";
    } catch(e) { alert(e.message); }
}

// LOGOUT
window.logout = function() {
    signOut(auth).then(() => location.reload());
}

// LOAD MEANING
window.loadMeaning = async function() {
    const num = document.getElementById("numberInput").value;
    const docRef = doc(db, "meanings", num);
    const docSnap = await getDoc(docRef);
    document.getElementById("meaningText").value = docSnap.exists() ? docSnap.data().text : "";
}

// SAVE MEANING
window.saveMeaning = async function() {
    const num = document.getElementById("numberInput").value;
    const text = document.getElementById("meaningText").value;
    await setDoc(doc(db, "meanings", num), { text });
    document.getElementById("status").innerText = "Đã lưu!";
}

// LOAD ALL MEANINGS FOR USER PAGE
if (document.getElementById("meanings")) {
    (async () => {
        const querySnapshot = await getDocs(collection(db, "meanings"));
        querySnapshot.forEach(docSnap => {
            document.getElementById("meanings").innerHTML += `
                <h3>Số ${docSnap.id}</h3>
                <p>${docSnap.data().text}</p><hr>
            `;
        });
    })();
}

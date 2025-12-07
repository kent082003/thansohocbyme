import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// LOGIN
window.login = async function () {
    const email = email.value;
    const pw = password.value;

    try {
        await signInWithEmailAndPassword(auth, email, pw);
        loginBox.style.display = "none";
        editorBox.style.display = "block";
    } catch (err) {
        alert(err.message);
    }
};

// LOGOUT
window.logout = function () {
    signOut(auth).then(() => location.reload());
};

// LOAD
window.loadMeaning = async function () {
    const type = typeSelect.value;
    const num = numberInput.value;

    if (!num) return alert("Bạn phải nhập số!");

    const ref = doc(db, "numerology", `${type}_${num}`);
    const snap = await getDoc(ref);

    meaningText.value = snap.exists() ? snap.data().text : "";
};

// SAVE
window.saveMeaning = async function () {
    const type = typeSelect.value;
    const num = numberInput.value;
    const text = meaningText.value;

    if (!num) return alert("Bạn phải nhập số!");

    await setDoc(doc(db, "numerology", `${type}_${num}`), { text });

    status.innerText = "Đã lưu!";
};

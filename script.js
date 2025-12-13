import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const typeSelect = document.getElementById("typeSelect");
const numberInput = document.getElementById("numberInput");
const meaningText = document.getElementById("meaningText");
const status = document.getElementById("status");

// LOGIN
window.login = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Đăng nhập thành công!");
    } catch (error) {
        alert("Sai email hoặc mật khẩu: " + error.message);
    }
};

// LOGOUT
window.logout = function () {
    signOut(auth).then(() => location.reload());
};

// LOAD số hiện tại
window.loadMeaning = async function () {
    const type = typeSelect.value;
    const num = numberInput.value;
    if (!num) return alert("Bạn phải nhập số!");

    const ref = doc(db, "numerology", `${type}_${num}`);
    const snap = await getDoc(ref);

    meaningText.value = snap.exists() ? snap.data().text : "";
    meaningText.style.background = snap.exists() ? "#e0f7ff" : "#fff";
    status.innerText = snap.exists() ? `Load thành công số ${num}` : `Chưa có dữ liệu số ${num}`;
};

// SAVE số hiện tại
window.saveMeaning = async function () {
    const type = typeSelect.value;
    const num = numberInput.value;
    const text = meaningText.value;
    if (!num || !text) return alert("Bạn phải nhập số và nội dung!");

    await setDoc(doc(db, "numerology", `${type}_${num}`), { text });
    status.innerText = `💾 Save thành công số ${num}`;
    meaningText.style.background = "#d4edda";
};

// NEXT số
window.nextNumber = function () {
    numberInput.value = Number(numberInput.value || 0) + 1;
    meaningText.value = "";
    meaningText.style.background = "#fff";
    status.innerText = "";
};

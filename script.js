// LOGIN
function login() {
    let email = document.getElementById("email").value;
    let pw = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, pw)
        .then(() => {
            document.getElementById("loginBox").style.display = "none";
            document.getElementById("editorBox").style.display = "block";
        })
        .catch(e => alert(e.message));
}

function logout() {
    auth.signOut().then(() => location.reload());
}

// LOAD MEANING
function loadMeaning() {
    let num = numberInput.value;

    db.collection("meanings").doc(num).get().then(doc => {
        meaningText.value = doc.exists ? doc.data().text : "";
    });
}

// SAVE
function saveMeaning() {
    let num = numberInput.value;
    let text = meaningText.value;

    db.collection("meanings").doc(num).set({ text })
        .then(() => status.innerText = "Đã lưu!")
        .catch(e => alert(e));
}

// USER PAGE LOAD ALL
if (document.getElementById("meanings")) {
    db.collection("meanings").get().then(snap => {
        snap.forEach(doc => {
            document.getElementById("meanings").innerHTML += `
                <h3>Số ${doc.id}</h3>
                <p>${doc.data().text}</p><hr>
            `;
        });
    });
}

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    prepareLogin();  // from index.js
}


function addNewUser() {
    let newEmail = document.getElementById('new-email').value;
    let newPassword = document.getElementById('new-password').value;
    let newName = document.getElementById('new-name').value;
    checkIfUserAlreadyExist(newEmail, newPassword, newName);
}


function checkIfUserAlreadyExist(newEmail, newPassword, newName) {
    let existingUser = false;
    for (let i = 0; i < users.length; i++) {
        if (newEmail == users[i]['email']) {
            existingUser = true;
        }
    }
    if (existingUser == true) {
        document.getElementById('sign-up-warning').classList.remove('d-none');
    } else {
        addCheckedContact(newEmail, newPassword, newName);
    }
}


function addCheckedContact(newEmail, newPassword, newName) {
    users.push({ email: newEmail, password: newPassword, name: newName });
    backend.setItem('users', JSON.stringify(users));
    showSignUpMessage();
    cleanInputsAtSignUp();
}


function cleanInputsAtSignUp() {
    document.getElementById('new-email').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('new-name').value = '';
}


function showSignUpMessage() {
    document.getElementById('sign-up-box').classList.add('d-none');
    document.getElementById('signup-msg').classList.remove('d-none');
    setTimeout(backToLogin, 1500); // from index.js
    setTimeout(closeSignUpMessage, 1500);
}


function closeSignUpMessage() {
    document.getElementById('signup-msg').classList.add('d-none');
}
let activeUser = [];


function prepareLogin() {
    hideSignUpBox();
    closeForgotPasswordBox();
}


function hideSignUpBox() {
    document.getElementById('sign-up-box').classList.add('d-none');
}


function showSignUpBox() {
    document.getElementById('sign-up-box').classList.remove('d-none');
    document.getElementById('log-mainbox').classList.add('d-none');
    document.getElementById('log-register').classList.add('d-none');
    document.getElementById('sign-up-box').style.animation = 'none';
}


function backToLogin() {
    document.getElementById('sign-up-box').classList.add('d-none');
    document.getElementById('log-mainbox').classList.remove('d-none');
    document.getElementById('log-register').classList.remove('d-none');
    document.getElementById('log-mainbox').style.animation = 'none';
    document.getElementById('log-register').style.animation = 'none';
    document.getElementById('forgot-pw-box').classList.add('d-none');
    document.getElementById('sign-up-warning').classList.add('d-none');
    cleanInputsAtSignUp();
}


function openForgotPasswordBox() {
    document.getElementById('forgot-pw-box').classList.remove('d-none');
    document.getElementById('log-mainbox').classList.add('d-none');
    document.getElementById('log-register').classList.add('d-none');
    document.getElementById('forgot-pw-box').style.animation = 'none';
}


function closeForgotPasswordBox() {
    document.getElementById('forgot-pw-box').classList.add('d-none');
}


async function login() {
    let logEmail = document.getElementById('email').value;
    let logPassword = document.getElementById('password').value;
    for (let i = 0; i < users.length; i++) {
        let userName = users[i]['name'];
        let userEmail = users[i]['email'];
        let userPassword = users[i]['password'];
        if (logEmail == userEmail && logPassword == userPassword) {
            activeUser.push(userName, userEmail, userPassword);
            await backend.setItem('activeUser', JSON.stringify(activeUser));
            window.location.href = 'summary.html';
            document.getElementById('wrong-password').classList.add('d-none');
        } else {
            document.getElementById('wrong-password').classList.remove('d-none');
        }
    }
}


async function guestLogin() {
    let guest = 'guest';
    activeUser.push(guest);
    await backend.setItem('activeUser', JSON.stringify(activeUser));
    window.location.href = 'summary.html';
}


function showPassword() {
    document.getElementById('password').setAttribute('type', 'text');
    document.getElementById('lock').classList.add('d-none');
    document.getElementById('unlock').classList.remove('d-none');
}


function hidePassword() {
    document.getElementById('password').setAttribute('type', 'password');
    document.getElementById('lock').classList.remove('d-none');
    document.getElementById('unlock').classList.add('d-none');
}


function showPasswordSignUp() {
    document.getElementById('new-password').setAttribute('type', 'text');
    document.getElementById('sign-lock').classList.add('d-none');
    document.getElementById('sign-unlock').classList.remove('d-none');
}


function hidePasswordSignUp() {
    document.getElementById('new-password').setAttribute('type', 'password');
    document.getElementById('sign-lock').classList.remove('d-none');
    document.getElementById('sign-unlock').classList.add('d-none');
}


function showEndOfDemoPopup() {
    document.getElementById('demo-popup').classList.remove('d-none');
}


function closeEndOfDemoPopup() {
    document.getElementById('demo-popup').classList.add('d-none');
}


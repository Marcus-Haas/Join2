let contacts = [];


async function initContacts() {
    await includeHTML();
    loadContactsFromBackend();
    loadTasksFromBackend();
    showActiveCategorieContacts();
    renderAlphabet();
    renderAlphabetResponsive();
}


function showCreateContact() {
    document.getElementById('create-overlay').classList.add('show-overlay-contact-box');
    document.getElementById('dark-body').classList.remove('d-none');
}


function closeCreateContact() {
    document.getElementById('create-overlay').classList.remove('show-overlay-contact-box');
    document.getElementById('dark-body').classList.add('d-none');
    cleanAddContactInputs();
    document.getElementById('email-warning').classList.add('d-none');
}


function showEditContact(i) {
    EditContact(i);
    document.getElementById('edit-overlay').classList.add('show-overlay-contact-box');
    document.getElementById('dark-body').classList.remove('d-none');
}


function closeEditContact() {
    document.getElementById('edit-overlay').classList.remove('show-overlay-contact-box');
    document.getElementById('dark-body').classList.add('d-none');
}


function createNewContact() {
    let newName = document.getElementById('add-name').value;
    let newEmail = document.getElementById('add-email').value;
    let newPhone = document.getElementById('add-phone').value;
    let newInitials = newName.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    let newRandomNumber = randomNumber();
    checkExistingContacts(newName, newEmail, newPhone, newInitials, newRandomNumber);
}


function checkExistingContacts(newName, newEmail, newPhone, newInitials, newRandomNumber) {
    let existingContact = false;
    for (let i = 0; i < contacts.length; i++) {
        if (newEmail == contacts[i]['email']) {
            existingContact = true;
        }
    }
    if (existingContact == true) {
        document.getElementById('email-warning').classList.remove('d-none');
    } else {
        addContact(newName, newEmail, newPhone, newInitials, newRandomNumber);
    }
}


function addContact(newName, newEmail, newPhone, newInitials, newRandomNumber) {
    contacts.push({ name: newName, email: newEmail, phone: newPhone, initials: newInitials, color: newRandomNumber });
    pushContactsToBackend();
    closeCreateContact();
    renderAlphabet();
    showContactCreatedMessage();
    renderAlphabetResponsive();
    openBusinessCard(contacts.length - 1);
    document.getElementById('email-warning').classList.add('d-none');
}


function cleanAddContactInputs() {
    document.getElementById('add-name').value = "";
    document.getElementById('add-email').value = "";
    document.getElementById('add-phone').value = "";
}


function renderAlphabet() {
    let x = document.getElementById('contactbook-main');
    x.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        x.innerHTML += generateAlphabetHTML(i);
        renderContactbook(`${String.fromCharCode(i)}`);
    }
}


function generateAlphabetHTML(i) {
    return /*html*/ `
    <div class="alphabet-div d-none" id="letter${String.fromCharCode(i)}">
            <span>${String.fromCharCode(i)}</span>
            <div class="alphabet-vector"></div>
            <div id="${String.fromCharCode(i)}"></div>
        </div>
    `;
}


function renderContactbook(alphabet) {
    for (let i = 0; i < contacts.length; i++) {
        let letter = contacts[i]['name'].charAt(0).toUpperCase();
        if (alphabet == letter) {
            document.getElementById(`letter${alphabet}`).classList.remove('d-none');
            document.getElementById(`${alphabet}`).innerHTML += generateContactbook(i);
            randomColorPicker(i)
        }
    }
}


function generateContactbook(i) {
    return /*html*/ `
    <div class="contactbook-frame" id="contactbook-frame${i}" onclick="openBusinessCard(${i})">
            <div class="contactbook-circle" id="contactbook-circle${i}">
                <span class="contactbook-circle-initials">${contacts[i]['initials']}</span>
            </div>
            <div class="contactbook-details">
                <span class="contactbook-name" id="contactbook-name${i}">${contacts[i]['name']}</span>
                <span class="contactbook-email">${contacts[i]['email']}</span>
            </div>
        </div>
    `;
}


function openBusinessCard(i) {
    document.getElementById('floating-box').innerHTML = "";
    document.getElementById('floating-box').innerHTML = generateBusinessCard(i);
    setDarkContact(i);
}

function closeBusniessCard() {
    document.getElementById('floating-box').innerHTML = "";
}


function generateBusinessCard(i) {
    return /*html*/ `
        <div class="floating-contact">
            <div class="floating-circle circle-color-${contacts[i]['color']}" >
                <span class="floating-circle-initials">${contacts[i]['initials']}</span>
            </div>
            <div class="floating-contact-details">
                <span class="floating-contact-name">${contacts[i]['name']}</span>
                <span class="floating-contact-task" onclick="showFloatingAddTaskAtContacts()">+ Add Task</span>
            </div>
        </div>
        <div class="contact-information-frame">
            <span class="contact-information-text">Contact Information</span>
            <div class="contact-information-edit" onclick="showEditContact(${i})">
                <img src="assets/img/contact-pen.svg">
                <span>Edit Contact</span>
            </div>
        </div>
        <div class="contact-information-details">
            <span><b>Email</b></span>
            <span class="contact-information-email">${contacts[i]['email']}</span>
            <span><b>Phone</b></span>
            <span>${contacts[i]['phone']}</span>
            <div class="delete-contact" id="delete" title="delete" onclick="deleteContact(${i})"></div>
        </div>
    `;
}


function EditContact(i) {
    document.getElementById('edit-overlay').innerHTML = generateEditContact(i);
    getContactInformation(i);
}


function generateEditContact(i) {
    return /*html*/ `
        <div class="overlay-add-left">
            <img class="overlay-add-logo" src="assets/img/join-logo-light.svg">
            <span class="overlay-add-headline">Edit contact</span>
            <div class="overlay-add-vector"></div>
        </div>
        <div class="overlay-add-right">
            <div class="overlay-edit-circle circle-color-${contacts[i]['color']}">
                <span>${contacts[i]['initials']}</span>
            </div>
            <div class="overlay-add-details-frame">
                <div class="overlay-add-close">
                    <span class="overlay-add-cross" onclick="closeEditContact()">X</span>
                </div>
                <div class="overlay-input-fields">
                    <input class="overlay-input-style name-image" id="edit-name" type="text" placeholder="Name" required>
                    <input class="overlay-input-style email-image" id="edit-email" type="email" placeholder="Email" required>
                    <input class="overlay-input-style phone-image" id="edit-phone" type="tel" placeholder="Phone" required>
                </div>
                <div class="overlay-edit-btn">
                    <button class="overlay-edit-save-btn" onclick="updateContact(${i})">Save</button>
                </div>
            </div>
        </div>
    `;
}


function getContactInformation(i) {
    document.getElementById('edit-name').value = contacts[i]['name'];
    document.getElementById('edit-email').value = contacts[i]['email'];
    document.getElementById('edit-phone').value = contacts[i]['phone'];
}


function updateContact(i) {
    let newName = document.getElementById('edit-name').value;
    let newEmail = document.getElementById('edit-email').value;
    let newPhone = document.getElementById('edit-phone').value;
    let newInitials = newName.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    contacts[i]['name'] = newName;
    contacts[i]['email'] = newEmail;
    contacts[i]['phone'] = newPhone;
    contacts[i]['initials'] = newInitials;
    pushContactsToBackend();
    closeEditContact();
    renderAlphabet();
    renderAlphabetResponsive();
    openBusinessCard(i);
    openBusinessCardResponsive(i);
}


function pushContactsToBackend() {
    let key = activeUser[0];
    backend.setItem(key, JSON.stringify(contacts));
}


function loadContactsFromBackend() {
    let key = activeUser[0];
    contacts = JSON.parse(backend.getItem(key)) || [];
}


function deleteContact(i) {
    contacts.splice(i, 1);
    pushContactsToBackend();
    renderAlphabet();
    renderAlphabetResponsive();
    closeBusniessCard();
}


function showActiveCategorieContacts() {
    setTimeout(function () {
        document.getElementById('nav-categories-3').classList.add('active-categorie');
        document.getElementById('nav-text-3').style.color = 'white';
        document.getElementById('nav-image-3').style.opacity = '1';
        document.getElementById('nav-categories-rs-3').classList.add('active-categorie');
        document.getElementById('nav-categories-rs-3').style.color = 'white';
        document.getElementById('nav-image-rs-3').style.opacity = '1';
    }, 200);
}


function setDarkContact(i) {
    removeDarkContact();
    document.getElementById(`contactbook-frame${i}`).style.background = '#2A3647';
    document.getElementById(`contactbook-name${i}`).style.color = 'white';
}



function removeDarkContact() {
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById(`contactbook-frame${i}`).style.background = 'none';
        document.getElementById(`contactbook-name${i}`).style.color = 'black';
    }

}


function showContactCreatedMessage() {
    setTimeout(function () {
        document.getElementById('created-overlay').classList.add('show-created-overlay');
    }, 100);
    closeContactCreatedMessage();
}


function closeContactCreatedMessage() {
    setTimeout(function () {
        document.getElementById('created-overlay').classList.remove('show-created-overlay');
    }, 2500);
}


function randomNumber() {
    let randomNumber = Math.floor(Math.random() * 10);
    return randomNumber;
}


function randomColorPicker(i) {
    let color = document.getElementById(`contactbook-circle${i}`);
    randomColorPickerExtention1(color, i);
    randomColorPickerExtention2(color, i);
}


function randomColorPickerExtention1(color, i) {
    if (contacts[i]['color'] == 0) {
        color.classList.add('circle-color-0');
    }
    if (contacts[i]['color'] == 1) {
        color.classList.add('circle-color-1');
    }
    if (contacts[i]['color'] == 2) {
        color.classList.add('circle-color-2');
    }
    if (contacts[i]['color'] == 3) {
        color.classList.add('circle-color-3');
    }
    if (contacts[i]['color'] == 4) {
        color.classList.add('circle-color-4');
    }
}


function randomColorPickerExtention2(color, i) {
    if (contacts[i]['color'] == 5) {
        color.classList.add('circle-color-5');
    }
    if (contacts[i]['color'] == 6) {
        color.classList.add('circle-color-6');
    }
    if (contacts[i]['color'] == 7) {
        color.classList.add('circle-color-7');
    }
    if (contacts[i]['color'] == 8) {
        color.classList.add('circle-color-8');
    }
    if (contacts[i]['color'] == 9) {
        color.classList.add('circle-color-9');
    }
}


function showFloatingAddTaskAtContacts() {
    document.getElementById('dark-body').classList.remove('d-none');
    document.getElementById('floating-addTask').classList.add('show-floating-addTask');
    document.getElementById('floating-addTask').innerHTML = generateFloatingTaskHTMLAtContacts();
    getCurrentUserContacts();
}


function getCurrentUserContacts() {
    document.getElementById('option').innerHTML = activeUser[0];
}
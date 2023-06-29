function renderAlphabetResponsive() {
    document.getElementById('kanban-contacts').classList.add('d-none');
    document.getElementById('floating-box-rs').classList.add('d-none');
    document.getElementById('contacts-headline-box-rs').classList.add('d-none');
    document.getElementById('contactbook-main-rs').innerHTML = "";
    let x = document.getElementById('contactbook-main-rs');
    x.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        x.innerHTML += generateAlphabetHTMLResponsive(i);
        renderContactbookResponsive(`${String.fromCharCode(i)}`);
    }
}


function renderContactbookResponsive(alphabet) {
    for (let i = 0; i < contacts.length; i++) {
        let letter = contacts[i]['name'].charAt(0).toUpperCase();
        if (alphabet == letter) {
            document.getElementById(`letter-rs${alphabet}`).classList.remove('d-none');
            document.getElementById(`rs${alphabet}`).innerHTML += generateContactbookResponsive(i);
            randomColorPickerResponsive(i);
        }
    }
}


function generateContactbookResponsive(i) {
    return /*html*/ `
    <div class="contactbook-frame" id="contactbook-frame${i}" onclick="openBusinessCardResponsive(${i})">
            <div class="contactbook-circle" id="contactbook-circle-rs${i}">
                <span class="contactbook-circle-initials">${contacts[i]['initials']}</span>
            </div>
            <div class="contactbook-details">
                <span class="contactbook-name" id="contactbook-name${i}">${contacts[i]['name']}</span>
                <span class="contactbook-email">${contacts[i]['email']}</span>
            </div>
        </div>
    `;
}


function generateAlphabetHTMLResponsive(i) {
    return /*html*/ `
    <div class="alphabet-div-rs d-none" id="letter-rs${String.fromCharCode(i)}">
            <span>${String.fromCharCode(i)}</span>
            <div class="alphabet-vector"></div>
            <div id="rs${String.fromCharCode(i)}"></div>
        </div>
    `;
}


function randomColorPickerResponsive(i) {
    let color = document.getElementById(`contactbook-circle-rs${i}`);
    generateColors(color, i);
}


function openBusinessCardResponsive(i) {
    document.getElementById('kanban-contacts').classList.remove('d-none');
    document.getElementById('floating-box-rs').classList.remove('d-none');
    document.getElementById('contacts-headline-box-rs').classList.remove('d-none');
    document.getElementById('contactbook-main-rs').classList.add('d-none');
    document.getElementById('floating-box-rs').innerHTML = "";
    document.getElementById('floating-box-rs').innerHTML = generateBusinessCardResponsive(i);
    document.getElementById('new-contact-btn').classList.add('d-none');
}


function generateBusinessCardResponsive(i) {
    return /*html*/ `
        <div class="floating-contact">
            <div class="floating-circle circle-color-${contacts[i]['color']}" >
                <span class="floating-circle-initials">${contacts[i]['initials']}</span>
            </div>
            <div class="floating-contact-details">
                <span class="floating-contact-name">${contacts[i]['name']}</span>
                <span class="floating-contact-task" onclick="openAddTaskHTML()">+ Add Task</span>
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
            <a href="mailto:${contacts[i]['email']}" class="contact-information-email">${contacts[i]['email']}</a>
            <span><b>Phone</b></span>
            <span>${contacts[i]['phone']}</span>
        </div>
        <div class="contact-rs-icons">
            <img class="contact-delete-rs" src="assets/img/delete.png" onclick="deleteContactResponsive(${i})">
            <img class="contact-edit-rs" src="assets/img/pen-responsive.png" onclick="showEditContact(${i})">
        </div>
    `;
}


function closeBusinessCardResponsive() {
    document.getElementById('contactbook-main-rs').classList.remove('d-none');
    document.getElementById('new-contact-btn').classList.remove('d-none');
    renderAlphabetResponsive();
}


function deleteContactResponsive(i) {
    contacts.splice(i, 1);
    pushContactsToBackend();
    closeBusinessCardResponsive();
}


function openAddTaskHTML() {
    window.location.href = 'add-task.html';
}
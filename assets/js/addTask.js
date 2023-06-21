let prio = 0;


async function initAddTask() {
    await includeHTML();
    showActiveCategorieAddTask();
    loadTasksFromBackend();
    getCurrentUser();
}


function choosePrioUrgent() {
    let urgentPrio = document.getElementById('prio-urgent');
    let urgentIMG = document.getElementById('urgent-img');
    urgentPrio.style.color = 'white';
    urgentPrio.style.backgroundColor = '#FF3D00';
    urgentPrio.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    urgentIMG.src = 'assets/img/urgent-white.svg';
    removePrioMedium();
    removePrioLow();
    prio = 1;
}

function choosePrioUrgentResponsive() {
    let urgentPrio = document.getElementById('prio-urgent-rs');
    let urgentIMG = document.getElementById('urgent-img-rs');
    urgentPrio.style.color = 'white';
    urgentPrio.style.backgroundColor = '#FF3D00';
    urgentPrio.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    urgentIMG.src = 'assets/img/urgent-white.svg';
    removePrioMediumResponsive();
    removePrioLowResponsive();
    prio = 1;
}


function choosePrioMedium() {
    let mediumPrio = document.getElementById('prio-medium');
    let mediumIMG = document.getElementById('medium-img');
    mediumPrio.style.color = 'white';
    mediumPrio.style.backgroundColor = '#FFA800';
    mediumPrio.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    mediumIMG.src = 'assets/img/medium-white.svg';
    removePrioUrgent();
    removePrioLow();
    prio = 2;
}


function choosePrioMediumResponsive() {
    let mediumPrio = document.getElementById('prio-medium-rs');
    let mediumIMG = document.getElementById('medium-img-rs');
    mediumPrio.style.color = 'white';
    mediumPrio.style.backgroundColor = '#FFA800';
    mediumPrio.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    mediumIMG.src = 'assets/img/medium-white.svg';
    removePrioUrgentResponsive();
    removePrioLowResponsive();
    prio = 2;
}


function choosePrioLow() {
    let lowPrio = document.getElementById('prio-low');
    let lowIMG = document.getElementById('low-img');
    lowPrio.style.color = 'white';
    lowPrio.style.backgroundColor = '#7AE229';
    lowPrio.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    lowIMG.src = 'assets/img/low-white.svg';
    removePrioUrgent();
    removePrioMedium();
    prio = 3;
}


function choosePrioLowResponsive() {
    let lowPrio = document.getElementById('prio-low-rs');
    let lowIMG = document.getElementById('low-img-rs');
    lowPrio.style.color = 'white';
    lowPrio.style.backgroundColor = '#7AE229';
    lowPrio.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    lowIMG.src = 'assets/img/low-white.svg';
    removePrioUrgentResponsive();
    removePrioMediumResponsive();
    prio = 3;
}


function removePrioUrgent() {
    let urgentPrio = document.getElementById('prio-urgent');
    let urgentIMG = document.getElementById('urgent-img');
    urgentPrio.style.color = '';
    urgentPrio.style.backgroundColor = '';
    urgentPrio.style.boxShadow = '';
    urgentIMG.src = 'assets/img/urgent.svg';
}


function removePrioUrgentResponsive() {
    let urgentPrio = document.getElementById('prio-urgent-rs');
    let urgentIMG = document.getElementById('urgent-img-rs');
    urgentPrio.style.color = '';
    urgentPrio.style.backgroundColor = '';
    urgentPrio.style.boxShadow = '';
    urgentIMG.src = 'assets/img/urgent.svg';
}


function removePrioMedium() {
    let mediumPrio = document.getElementById('prio-medium');
    let mediumIMG = document.getElementById('medium-img');
    mediumPrio.style.color = '';
    mediumPrio.style.backgroundColor = '';
    mediumPrio.style.boxShadow = '';
    mediumIMG.src = 'assets/img/medium.svg';
}


function removePrioMediumResponsive() {
    let mediumPrio = document.getElementById('prio-medium-rs');
    let mediumIMG = document.getElementById('medium-img-rs');
    mediumPrio.style.color = '';
    mediumPrio.style.backgroundColor = '';
    mediumPrio.style.boxShadow = '';
    mediumIMG.src = 'assets/img/medium.svg';
}


function removePrioLow() {
    let lowPrio = document.getElementById('prio-low');
    let lowIMG = document.getElementById('low-img');
    lowPrio.style.color = '';
    lowPrio.style.backgroundColor = '';
    lowPrio.style.boxShadow = '';
    lowIMG.src = 'assets/img/low.svg';
}


function removePrioLowResponsive() {
    let lowPrio = document.getElementById('prio-low-rs');
    let lowIMG = document.getElementById('low-img-rs');
    lowPrio.style.color = '';
    lowPrio.style.backgroundColor = '';
    lowPrio.style.boxShadow = '';
    lowIMG.src = 'assets/img/low.svg';
}


function createTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let assign = document.getElementById('assign').value;
    let initials = assign.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    let task = {
        'initials': initials,
        'title': title,
        'description': description,
        'date': date,
        'category': category,
        'assign': assign,
        'status': 'todo',
        'prio': checkPrio(),
    }
    pushTasks(title, description, date, category, assign, task);
}


function pushTasks(title, description, date, category, assign, task) {
    checkFormInputs();
    if (prio > 0 && title != "" && description != "" && date != "" && category != "" && assign != "") {
        allTasks.push(task);
        removeRequiredMessages();
        showAddedTaskMessage();
        moveToBoard();
        pushTasksToBackend();
    }
}

function pushTasksToBackend() {
    backend.setItem('allTasks', JSON.stringify(allTasks));
}


function loadTasksFromBackend() {
    let allTasksAsJSON = backend.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsJSON) || [];
}


function showAddedTaskMessage() {
    document.getElementById('task-added-message').classList.add('show-task-added-message');
}


function moveToBoard() {
    setTimeout(function () {
        window.location.href = 'board.html';
    }, 1500);
}


function checkFormInputs() {
    let titleInput = document.getElementById('title').value;
    let descriptionInput = document.getElementById('description').value;
    let dateInput = document.getElementById('date').value;
    if (titleInput == "") {
        document.getElementById('required-title').classList.remove('d-none');
    }
    if (descriptionInput == "") {
        document.getElementById('required-description').classList.remove('d-none');
    }
    if (dateInput == "") {
        document.getElementById('required-date').classList.remove('d-none');
    }
}


function checkPrio() {
    if (prio == 1) {
        return 'urgent';
    }
    if (prio == 2) {
        return 'medium';
    }
    if (prio == 3) {
        return 'low';
    } else {
        document.getElementById('required-prio').classList.remove('d-none');
    }
}


function removeRequiredMessages() {
    document.getElementById('required-prio').classList.add('d-none');
    document.getElementById('required-date').classList.add('d-none');
    document.getElementById('required-description').classList.add('d-none');
    document.getElementById('required-title').classList.add('d-none');
}


function showActiveCategorieAddTask() {
    setTimeout(function () {
        document.getElementById('nav-categories-2').classList.add('active-categorie');
        document.getElementById('nav-text-2').style.color = 'white';
        document.getElementById('nav-image-2').style.opacity = '1';
        document.getElementById('nav-categories-rs-2').classList.add('active-categorie');
        document.getElementById('nav-categories-rs-2').style.color = 'white';
        document.getElementById('nav-image-rs-2').style.opacity = '1';
    }, 200);
}


function createTaskResponsive() {
    let title = document.getElementById('title-rs').value;
    let description = document.getElementById('description-rs').value;
    let date = document.getElementById('date-rs').value;
    let category = document.getElementById('category-rs').value;
    let assign = document.getElementById('assign-rs').value;
    let initials = assign.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    let task = {
        'initials': initials,
        'title': title,
        'description': description,
        'date': date,
        'category': category,
        'assign': assign,
        'status': 'todo',
        'prio': checkPrio(),
    }
    pushTasksResponsive(title, description, date, category, assign, task);
}



function pushTasksResponsive(title, description, date, category, assign, task) {
    checkFormInputsResponsive();
    if (prio > 0 && title != "" && description != "" && date != "" && category != "" && assign != "") {
        allTasks.push(task);
        removeRequiredMessages();
        removePrioMediumResponsive();
        showAddedTaskMessage();
        moveToBoard();
        pushTasksToBackend();
    }
}


function checkFormInputsResponsive() {
    let titleInput = document.getElementById('title-rs').value;
    let descriptionInput = document.getElementById('description-rs').value;
    let dateInput = document.getElementById('date-rs').value;
    if (titleInput == "") {
        document.getElementById('required-title-rs').classList.remove('d-none');
    }
    if (descriptionInput == "") {
        document.getElementById('required-description-rs').classList.remove('d-none');
    }
    if (dateInput == "") {
        document.getElementById('required-date-rs').classList.remove('d-none');
    }
}


function removeRequiredMessagesResponsive() {
    document.getElementById('required-prio-rs').classList.add('d-none');
    document.getElementById('required-date-rs').classList.add('d-none');
    document.getElementById('required-description-rs').classList.add('d-none');
    document.getElementById('required-title-rs').classList.add('d-none');
}


function getCurrentUser() {
    document.getElementById('option').innerHTML = activeUser[0];
    document.getElementById('option-rs').innerHTML = activeUser[0];
}
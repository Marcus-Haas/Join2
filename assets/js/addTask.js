let prio = 0;
let newSelectedColor;
let selectedCategory = 0;
let selectedAssign = 0;
let assignColor;
let departmentArray = [
    {
        department: 'Sales',
        departmentColor: 'sales'
    },
    {
        department: 'Marketing',
        departmentColor: 'marketing'
    },
    {
        department: 'Design',
        departmentColor: 'design'
    },
    {
        department: 'Backoffice',
        departmentColor: 'backoffice'
    },
    {
        department: 'Media',
        departmentColor: 'media'
    }
];

let assignArray = [];


async function initAddTask() {
    await includeHTML();
    showActiveCategorieAddTask();
    loadTasksFromBackend();
    loadAssignArray();
    loadDepartmentArray();
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


function removePrioUrgent() {
    let urgentPrio = document.getElementById('prio-urgent');
    let urgentIMG = document.getElementById('urgent-img');
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


function removePrioLow() {
    let lowPrio = document.getElementById('prio-low');
    let lowIMG = document.getElementById('low-img');
    lowPrio.style.color = '';
    lowPrio.style.backgroundColor = '';
    lowPrio.style.boxShadow = '';
    lowIMG.src = 'assets/img/low.svg';
}


function createTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let category = selectedCategory;
    let assign = selectedAssign;
    let color = newSelectedColor;
    let task = {
        'initials': getInitials(assign),
        'title': title,
        'description': description,
        'date': date,
        'category': category,
        'assign': assign,
        'status': 'todo',
        'prio': checkPrio(),
        'color': color,
        'assignNumber': assignColor,
    }
    pushTasks(title, description, date, category, assign, task);
}


function pushTasks(title, description, date, category, assign, task) {
    checkFormInputs(title, description, date);
    if (prio > 0 && title != "" && description != "" && date != "" && category != 0 && assign != 0) {
        allTasks.push(task);
        removeRequiredMessages();
        showAddedTaskMessage();
        moveToBoard();
        pushTasksToBackend();
    }
}


function getInitials(assign) {
    if (assign) {
        let initials = assign.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
        return initials;
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


function checkFormInputs(title, description, date) {
    if (title == "") {
        document.getElementById('required-title').classList.remove('d-none');
    }
    if (description == "") {
        document.getElementById('required-description').classList.remove('d-none');
    }
    if (date == "") {
        document.getElementById('required-date').classList.remove('d-none');
    }
    if (selectedCategory == 0) {
        document.getElementById('required-category').classList.remove('d-none');
    }
    if (selectedAssign == 0) {
        document.getElementById('required-assign').classList.remove('d-none');
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
    document.getElementById('required-category').classList.add('d-none');
    document.getElementById('required-assign').classList.add('d-none');
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


function setNewBorderOptions(categoryOrAssign) {
    document.getElementById(`${categoryOrAssign}`).style.borderBottom = 'none';
    document.getElementById(`${categoryOrAssign}`).style.borderBottomRightRadius = '0px';
    document.getElementById(`${categoryOrAssign}`).style.borderBottomLeftRadius = '0px';
}


function unsetNewBorderOptions(categoryOrAssign) {
    document.getElementById(`${categoryOrAssign}`).style.borderBottom = '1px solid #D1D1D1';
    document.getElementById(`${categoryOrAssign}`).style.borderBottomRightRadius = '10px';
    document.getElementById(`${categoryOrAssign}`).style.borderBottomLeftRadius = '10px';
}


function openCategoryOptions() {
    setNewBorderOptions('category');
    let categoryOptions = document.getElementById('category-options');
    categoryOptions.classList.remove('d-none');
    categoryOptions.innerHTML = generateNewCategoryHTML();
    for (let i = 0; i < departmentArray.length; i++) {
        categoryOptions.innerHTML += generateOptionsHTML(i);
    }
    document.getElementById('category').setAttribute('onclick', 'closeNewCategory()');
}


function generateNewCategoryHTML() {
    return /*html*/`
    <div class="add-task-category-assign-options-details" onclick="setNewCategory()">New category</div>
    `;
}


function generateOptionsHTML(i) {
    return /*html*/`
    <div class="add-task-category-assign-options-details" onclick="chooseCategory(${i})">${departmentArray[i]['department']}
        <div class="add-task-category-color ${departmentArray[i]['departmentColor']}"></div>
    </div>
    `;
}


function chooseCategory(i) {
    unsetCategoryColor();
    unsetNewBorderOptions('category');
    document.getElementById('category-options').classList.add('d-none');
    document.getElementById('selected-category').innerHTML = departmentArray[i]['department'];
    document.getElementById('selected-category-color').classList.add(departmentArray[i]['departmentColor']);
    document.getElementById('selected-category-color').classList.remove('default');
    selectedCategory = departmentArray[i]['department'];
    newSelectedColor = departmentArray[i]['departmentColor'];
}


function unsetCategoryColor() {
    let color = document.getElementById('selected-category-color');
    for (let i = 0; i < departmentArray.length; i++) {
        color.classList.remove(departmentArray[i]['departmentColor']);
    }
}


function setNewCategory() {
    document.getElementById('category-options').classList.add('d-none');
    document.getElementById('category').classList.add('d-none');
    document.getElementById('category-input').classList.remove('d-none');
    document.getElementById('new-colors-option').classList.remove('d-none');
    document.getElementById('category-inputfield').value = "";
    removeNewCategoryColor();
}


function closeNewCategory() {
    document.getElementById('category').classList.remove('d-none');
    document.getElementById('category-input').classList.add('d-none');
    document.getElementById('new-colors-option').classList.add('d-none');
    document.getElementById('category-options').classList.add('d-none');
    document.getElementById('selected-category').innerHTML = "Select task category";
    unsetCategoryColor();
    unsetNewBorderOptions('category');
    document.getElementById('category').setAttribute('onclick', 'openCategoryOptions()');
}


function setNewCategoryColor(number, color) {
    removeNewCategoryColor();
    document.getElementById(`selection-circle-${number}`).classList.add('dark-border-circle');
    newSelectedColor = color;
}


function removeNewCategoryColor() {
    for (let i = 0; i <= 5; i++) {
        document.getElementById(`selection-circle-${i}`).classList.remove('dark-border-circle');
    }
}


function saveNewCategory() {
    let newCategory = document.getElementById('category-inputfield').value;
    selectedCategory = newCategory;
    let newDepartment =
    {
        department: newCategory,
        departmentColor: newSelectedColor,
    }
    if (selectedCategory != 0) {
        departmentArray.push(newDepartment);
        unsetCategoryColor();
        document.getElementById('category-input').classList.add('d-none');
        document.getElementById('new-colors-option').classList.add('d-none');
        document.getElementById('category').classList.remove('d-none');
        document.getElementById('selected-category').innerHTML = newCategory;
        document.getElementById('selected-category-color').classList.add(newSelectedColor);
        unsetNewBorderOptions('category');
        backend.setItem('departmentArray', JSON.stringify(departmentArray));
    }
}


function openAssignOptions() {
    setNewBorderOptions('assign');
    let assignOptions = document.getElementById('assign-options');
    assignOptions.classList.remove('d-none');
    assignOptions.innerHTML = generateNewAssignHTML();
    for (let i = 0; i < assignArray.length; i++) {
        assignOptions.innerHTML += generateAssignOptionsHTML(i);
    }
    document.getElementById('assign-onclick').setAttribute('onclick', 'closeNewAssign()');
}


function generateNewAssignHTML() {
    return /*html*/`
    <div class="add-task-category-assign-options-details" onclick="setNewAssign()">New contact</div>
    <div class="add-task-category-assign-options-details" onclick="selectCurrentUserForAssign()">${activeUser[0]}</div>
    `;
}


function generateAssignOptionsHTML(i) {
    return /*html*/`
    <div class="add-task-category-assign-options-details" onclick="selectNewAssign(${i})">${assignArray[i]['assignName']}</div>
    `;
}


function selectNewAssign(i) {
    unsetNewBorderOptions('assign');
    document.getElementById('assign-options').classList.add('d-none');
    document.getElementById('selected-assign').innerHTML = assignArray[i]['assignName'];
    selectedAssign = assignArray[i]['assignName'];
    assignColor = assignArray[i]['assignNumber'];
}


function selectCurrentUserForAssign() {
    unsetNewBorderOptions('assign');
    document.getElementById('assign-options').classList.add('d-none');
    document.getElementById('selected-assign').innerHTML = activeUser[0];
    selectedAssign = activeUser[0];
    assignColor = 1;
}


function setNewAssign() {
    document.getElementById('assign-options').classList.add('d-none');
    document.getElementById('assign').classList.add('d-none');
    document.getElementById('assign-input').classList.remove('d-none');
    document.getElementById('assign-inputfield').value = "";
}


function closeNewAssign() {
    document.getElementById('assign').classList.remove('d-none');
    document.getElementById('assign-input').classList.add('d-none');
    document.getElementById('assign-options').classList.add('d-none');
    document.getElementById('selected-assign').innerHTML = "Select contacts to assign";
    unsetNewBorderOptions('assign');
    document.getElementById('assign-onclick').setAttribute('onclick', 'openAssignOptions()');
}


function saveNewAssign() {
    let newAssign = document.getElementById('assign-inputfield').value;
    selectedAssign = newAssign;
    assignColor = randomNumber();
    let newAssigment =
    {
        assignName: newAssign,
        assignNumber: assignColor,
    }
    if (selectedAssign != 0) {
        assignArray.push(newAssigment);
        document.getElementById('assign-input').classList.add('d-none');
        document.getElementById('assign').classList.remove('d-none');
        document.getElementById('selected-assign').innerHTML = newAssign;
        unsetNewBorderOptions('assign');
        backend.setItem('assignArray', JSON.stringify(assignArray));
    }
}


function loadAssignArray() {
    let assignArrayAsJSON = backend.getItem('assignArray');
    assignArray = JSON.parse(assignArrayAsJSON) || [];
}


function loadDepartmentArray() {
    let departmentArrayAsJSON = backend.getItem('departmentArray');
    departmentArray = JSON.parse(departmentArrayAsJSON) || departmentArray;
}


function disablePastDates() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
}
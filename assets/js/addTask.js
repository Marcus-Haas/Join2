let prio = 0;
let newSelectedColor;
let selectedCategory = 0;
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
    let assign = document.getElementById('assign').value;
    let color = newSelectedColor;
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
        'color': color,
    }
    pushTasks(title, description, date, category, assign, task);
}


function pushTasks(title, description, date, category, assign, task) {
    checkFormInputs(title, description, date);
    if (prio > 0 && title != "" && description != "" && date != "" && category != 0 && assign != "") {
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


function getCurrentUser() {
    document.getElementById('option').innerHTML = activeUser[0];
    document.getElementById('option-rs').innerHTML = activeUser[0];
}


function setNewBorderOptions() {
    document.getElementById('category').style.borderBottom = 'none';
    document.getElementById('category').style.borderBottomRightRadius = '0px';
    document.getElementById('category').style.borderBottomLeftRadius = '0px';
    document.getElementById('category-rs').style.borderBottom = 'none';
    document.getElementById('category-rs').style.borderBottomRightRadius = '0px';
    document.getElementById('category-rs').style.borderBottomLeftRadius = '0px';
}


function unsetNewBorderOptions() {
    document.getElementById('category').style.borderBottom = '1px solid #D1D1D1';
    document.getElementById('category').style.borderBottomRightRadius = '10px';
    document.getElementById('category').style.borderBottomLeftRadius = '10px';
    document.getElementById('category-rs').style.borderBottom = '1px solid #D1D1D1';
    document.getElementById('category-rs').style.borderBottomRightRadius = '10px';
    document.getElementById('category-rs').style.borderBottomLeftRadius = '10px';
}


function openCategoryOptions() {
    setNewBorderOptions();
    let categoryOptions = document.getElementById('category-options');
    categoryOptions.classList.remove('d-none');
    categoryOptions.innerHTML = generateNewCategoryHTML();
    for (let i = 0; i < departmentArray.length; i++) {
        categoryOptions.innerHTML += generateOptionsHTML(i);
    }
}


function generateNewCategoryHTML() {
    return /*html*/`
    <div class="add-task-category-options-details" onclick="setNewCategory()">New category</div>
    `;
}


function generateOptionsHTML(i) {
    return /*html*/`
    <div class="add-task-category-options-details" onclick="chooseCategory(${i})">${departmentArray[i]['department']}
        <div class="add-task-category-color ${departmentArray[i]['departmentColor']}"></div>
    </div>
    `;
}


function chooseCategory(i) {
    unsetCategoryColor();
    unsetNewBorderOptions();
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
    document.getElementById('selected-category').innerHTML = "Select task category";
    document.getElementById('selected-category-color').classList.add('default');
    unsetNewBorderOptions();
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
    departmentArray.push(newDepartment);
    unsetCategoryColor();
    document.getElementById('category-input').classList.add('d-none');
    document.getElementById('new-colors-option').classList.add('d-none');
    document.getElementById('category').classList.remove('d-none');
    document.getElementById('selected-category').innerHTML = newCategory;
    document.getElementById('selected-category-color').classList.add(newSelectedColor);
    unsetNewBorderOptions();
}


/*******************************responsive functions******************************************************************************/
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


function removePrioUrgentResponsive() {
    let urgentPrio = document.getElementById('prio-urgent-rs');
    let urgentIMG = document.getElementById('urgent-img-rs');
    urgentPrio.style.color = '';
    urgentPrio.style.backgroundColor = '';
    urgentPrio.style.boxShadow = '';
    urgentIMG.src = 'assets/img/urgent.svg';
}


function removePrioMediumResponsive() {
    let mediumPrio = document.getElementById('prio-medium-rs');
    let mediumIMG = document.getElementById('medium-img-rs');
    mediumPrio.style.color = '';
    mediumPrio.style.backgroundColor = '';
    mediumPrio.style.boxShadow = '';
    mediumIMG.src = 'assets/img/medium.svg';
}


function removePrioLowResponsive() {
    let lowPrio = document.getElementById('prio-low-rs');
    let lowIMG = document.getElementById('low-img-rs');
    lowPrio.style.color = '';
    lowPrio.style.backgroundColor = '';
    lowPrio.style.boxShadow = '';
    lowIMG.src = 'assets/img/low.svg';
}


function createTaskResponsive() {
    let title = document.getElementById('title-rs').value;
    let description = document.getElementById('description-rs').value;
    let date = document.getElementById('date-rs').value;
    let category = selectedCategory
    let assign = document.getElementById('assign-rs').value;
    color = newSelectedColor
    let initials = assign.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    let task = {
        'initials': initials,
        'title': title,
        'description': description,
        'date': date,
        'category': category,
        'assign': assign,
        'status': 'todo',
        'prio': checkPrioResponsive(),
        'color': color,
    }
    pushTasksResponsive(title, description, date, category, assign, task);
}



function pushTasksResponsive(title, description, date, category, assign, task) {
    checkFormInputsResponsive(title, description, date);
    if (prio > 0 && title != "" && description != "" && date != "" && category != 0 && assign != "") {
        allTasks.push(task);
        removeRequiredMessages();
        removePrioMediumResponsive();
        showAddedTaskMessage();
        moveToBoard();
        pushTasksToBackend();
    }
}


function checkFormInputsResponsive(title, description, date) {
    if (title == "") {
        document.getElementById('required-title-rs').classList.remove('d-none');
    }
    if (description == "") {
        document.getElementById('required-description-rs').classList.remove('d-none');
    }
    if (date == "") {
        document.getElementById('required-date-rs').classList.remove('d-none');
    }
    if (selectedCategory == 0) {
        document.getElementById('required-category-rs').classList.remove('d-none');
    }
}


function checkPrioResponsive() {
    if (prio == 1) {
        return 'urgent';
    }
    if (prio == 2) {
        return 'medium';
    }
    if (prio == 3) {
        return 'low';
    } else {
        document.getElementById('required-prio-rs').classList.remove('d-none');
    }
}


function removeRequiredMessagesResponsive() {
    document.getElementById('required-prio-rs').classList.add('d-none');
    document.getElementById('required-date-rs').classList.add('d-none');
    document.getElementById('required-description-rs').classList.add('d-none');
    document.getElementById('required-title-rs').classList.add('d-none');
}


function openCategoryOptionsResponsive() {
    setNewBorderOptions();
    let categoryOptions = document.getElementById('category-options-rs');
    categoryOptions.classList.remove('d-none');
    categoryOptions.innerHTML = generateNewCategoryHTMLResponsive();
    for (let i = 0; i < departmentArray.length; i++) {
        categoryOptions.innerHTML += generateOptionsHTMLResponsive(i);
    }
}


function generateNewCategoryHTMLResponsive() {
    return /*html*/`
    <div class="add-task-category-options-details" onclick="setNewCategoryResponsive()">New category</div>
    `;
}


function generateOptionsHTMLResponsive(i) {
    return /*html*/`
    <div class="add-task-category-options-details" onclick="chooseCategoryResponsive(${i})">${departmentArray[i]['department']}
        <div class="add-task-category-color ${departmentArray[i]['departmentColor']}"></div>
    </div>
    `;
}


function chooseCategoryResponsive(i) {
    unsetCategoryColorResponsive();
    unsetNewBorderOptions();
    document.getElementById('category-options-rs').classList.add('d-none');
    document.getElementById('selected-category-rs').innerHTML = departmentArray[i]['department'];
    document.getElementById('selected-category-color-rs').classList.add(departmentArray[i]['departmentColor']);
    document.getElementById('selected-category-color-rs').classList.remove('default');
    selectedCategory = departmentArray[i]['department'];
    newSelectedColor = departmentArray[i]['departmentColor']; 
}


function unsetCategoryColorResponsive() {
    let color = document.getElementById('selected-category-color-rs');
    for (let i = 0; i < departmentArray.length; i++) {
        color.classList.remove(departmentArray[i]['departmentColor']);
    }
}


function setNewCategoryResponsive() {
    document.getElementById('category-options-rs').classList.add('d-none');
    document.getElementById('category-rs').classList.add('d-none');
    document.getElementById('category-input-rs').classList.remove('d-none');
    document.getElementById('new-colors-option-rs').classList.remove('d-none');
    document.getElementById('category-inputfield-rs').value = "";
    removeNewCategoryColorResponsive();
}


function closeNewCategoryResponsive() {
    document.getElementById('category-rs').classList.remove('d-none');
    document.getElementById('category-input-rs').classList.add('d-none');
    document.getElementById('new-colors-option-rs').classList.add('d-none');
    document.getElementById('selected-category-rs').innerHTML = "Select task category";
    document.getElementById('selected-category-color-rs').classList.add('default');
    unsetNewBorderOptions();
}


function setNewCategoryColorResponsive(number, color) {
    removeNewCategoryColorResponsive();
    document.getElementById(`selection-circle-rs-${number}`).classList.add('dark-border-circle');
    newSelectedColor = color;
}


function removeNewCategoryColorResponsive() {
    for (let i = 0; i <= 5; i++) {
        document.getElementById(`selection-circle-rs-${i}`).classList.remove('dark-border-circle');
    }
}


function saveNewCategoryResponsive() {
    let newCategory = document.getElementById('category-inputfield-rs').value;
    selectedCategory = newCategory;
    let newDepartment =
    {
        department: newCategory,
        departmentColor: newSelectedColor,
    }
    departmentArray.push(newDepartment);
    unsetCategoryColorResponsive();
    document.getElementById('category-input-rs').classList.add('d-none');
    document.getElementById('new-colors-option-rs').classList.add('d-none');
    document.getElementById('category-rs').classList.remove('d-none');
    document.getElementById('selected-category-rs').innerHTML = newCategory;
    document.getElementById('selected-category-color-rs').classList.add(newSelectedColor);
    unsetNewBorderOptions();
}
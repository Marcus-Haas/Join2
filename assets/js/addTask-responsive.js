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
    let assign = selectedAssign;
    let color = newSelectedColor
    let task = {
        'initials': getInitials(assign),
        'title': title,
        'description': description,
        'date': date,
        'category': category,
        'assign': assign,
        'status': 'todo',
        'prio': checkPrioResponsive(),
        'color': color,
        'assignNumber': assignColor,
    }
    pushTasksResponsive(title, description, date, category, assign, task);
}



function pushTasksResponsive(title, description, date, category, assign, task) {
    checkFormInputsResponsive(title, description, date);
    if (prio > 0 && title != "" && description != "" && date != "" && category != 0 && assign != 0) {
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
    if (selectedAssign == 0) {
        document.getElementById('required-assign-rs').classList.remove('d-none');
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
    setNewBorderOptionsResponsive('category');
    let categoryOptions = document.getElementById('category-options-rs');
    categoryOptions.classList.remove('d-none');
    categoryOptions.innerHTML = generateNewCategoryHTMLResponsive();
    for (let i = 0; i < departmentArray.length; i++) {
        categoryOptions.innerHTML += generateOptionsHTMLResponsive(i);
    }
    document.getElementById('category-rs').setAttribute('onclick', 'closeNewCategoryResponsive()');
}


function generateNewCategoryHTMLResponsive() {
    return /*html*/`
    <div class="add-task-category-assign-options-details" onclick="setNewCategoryResponsive()">New category</div>
    `;
}


function generateOptionsHTMLResponsive(i) {
    return /*html*/`
    <div class="add-task-category-assign-options-details" onclick="chooseCategoryResponsive(${i})">${departmentArray[i]['department']}
        <div class="add-task-category-color ${departmentArray[i]['departmentColor']}"></div>
    </div>
    `;
}


function chooseCategoryResponsive(i) {
    unsetCategoryColorResponsive();
    unsetNewBorderOptionsResponsive('category');
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
    document.getElementById('category-options-rs').classList.add('d-none');
    document.getElementById('selected-category-rs').innerHTML = "Select task category";
    document.getElementById('selected-category-color-rs').classList.add('default');
    unsetNewBorderOptionsResponsive('category');
    document.getElementById('category-rs').setAttribute('onclick', 'openCategoryOptionsResponsive()');
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
    unsetNewBorderOptionsResponsive('category');
    backend.setItem('departmentArray', JSON.stringify(departmentArray));
}


function setNewBorderOptionsResponsive(categoryOrAssign) {
    document.getElementById(`${categoryOrAssign}-rs`).style.borderBottom = 'none';
    document.getElementById(`${categoryOrAssign}-rs`).style.borderBottomRightRadius = '0px';
    document.getElementById(`${categoryOrAssign}-rs`).style.borderBottomLeftRadius = '0px';
}


function unsetNewBorderOptionsResponsive(categoryOrAssign) {
    document.getElementById(`${categoryOrAssign}-rs`).style.borderBottom = '1px solid #D1D1D1';
    document.getElementById(`${categoryOrAssign}-rs`).style.borderBottomRightRadius = '10px';
    document.getElementById(`${categoryOrAssign}-rs`).style.borderBottomLeftRadius = '10px';
}


function openAssignOptionsResponsive() {
    setNewBorderOptionsResponsive('assign');
    let assignOptions = document.getElementById('assign-options-rs');
    assignOptions.classList.remove('d-none');
    assignOptions.innerHTML = generateNewAssignHTMLResponsive();
    for (let i = 0; i < assignArray.length; i++) {
        assignOptions.innerHTML += generateAssignOptionsHTMLResponsive(i);
    }
    document.getElementById('assign-onclick-rs').setAttribute('onclick', 'closeNewAssignResponsive()');
}


function generateNewAssignHTMLResponsive() {
    return /*html*/`
    <div class="add-task-category-assign-options-details" onclick="setNewAssignResponsive()">New contact</div>
    <div class="add-task-category-assign-options-details" onclick="selectCurrentUserForAssignResponsive()">${activeUser[0]}</div>
    `;
}


function generateAssignOptionsHTMLResponsive(i) {
    return /*html*/`
    <div class="add-task-category-assign-options-details" onclick="selectNewAssignResponsive(${i})">${assignArray[i]['assignName']}</div>
    `;
}


function selectNewAssignResponsive(i) {
    unsetNewBorderOptionsResponsive('assign');
    document.getElementById('assign-options-rs').classList.add('d-none');
    document.getElementById('selected-assign-rs').innerHTML = assignArray[i]['assignName'];
    selectedAssign = assignArray[i]['assignName'];
    assignColor = assignArray[i]['assignNumber'];
}


function selectCurrentUserForAssignResponsive() {
    unsetNewBorderOptions('assign');
    document.getElementById('assign-options-rs').classList.add('d-none');
    document.getElementById('selected-assign-rs').innerHTML = activeUser[0];
    selectedAssign = activeUser[0];
    assignColor = 1;
}


function setNewAssignResponsive() {
    document.getElementById('assign-options-rs').classList.add('d-none');
    document.getElementById('assign-rs').classList.add('d-none');
    document.getElementById('assign-input-rs').classList.remove('d-none');
    document.getElementById('assign-inputfield-rs').value = "";
}


function closeNewAssignResponsive() {
    document.getElementById('assign-rs').classList.remove('d-none');
    document.getElementById('assign-input-rs').classList.add('d-none');
    document.getElementById('assign-options-rs').classList.add('d-none');
    document.getElementById('selected-assign-rs').innerHTML = "Select contacts to assign";
    unsetNewBorderOptionsResponsive('assign');
    document.getElementById('assign-onclick-rs').setAttribute('onclick', 'openAssignOptionsResponsive()');
}


function saveNewAssignResponsive() {
    let newAssign = document.getElementById('assign-inputfield-rs').value;
    selectedAssign = newAssign;
    assignColor = randomNumber();
    let newAssigment =
    {
        assignName: newAssign,
        assignNumber: assignColor,
    }
    if (selectedAssign != 0) {
        assignArray.push(newAssigment);
        document.getElementById('assign-input-rs').classList.add('d-none');
        document.getElementById('assign-rs').classList.remove('d-none');
        document.getElementById('selected-assign-rs').innerHTML = newAssign;
        unsetNewBorderOptionsResponsive('assign');
        backend.setItem('assignArray', JSON.stringify(assignArray));
    }
}
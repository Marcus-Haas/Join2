let allTasks = [];
let dragID;
let a = false;
let b = false;
let c = false;
let d = false;
let newStatusParameter;


// drag and drop code by w3schools //
function allowDrop(ev) {
    ev.preventDefault();
}


function drag(ev, i) {
    //ev.dataTransfer.setData("text", ev.target.id);
    dragID = i;
}


function drop(ev, newStatus) {
    //ev.preventDefault();
    //let data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    allTasks[dragID]['status'] = newStatus;
    pushTasksToBackend();
    prepareRenderTasks();
}


async function initBoard() {
    await includeHTML();
    showActiveCategorieBoard();
    loadTasksFromBackend();
    prepareRenderTasks();
}


function prepareRenderTasks() {
    let todo = document.getElementById('board-column-todo');
    let progress = document.getElementById('board-column-progress');
    let feedback = document.getElementById('board-column-feedback');
    let done = document.getElementById('board-column-done');
    resetParameter();
    cleanBoard();
    renderTasks(todo, progress, feedback, done);
    generateEmptyText(todo, progress, feedback, done);
}


function renderTasks(todo, progress, feedback, done) {
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['status'] == 'todo') {
            a = true;
            generateTask(todo, i);
        }
        if (allTasks[i]['status'] == 'progress') {
            b = true;
            generateTask(progress, i);
        }
        if (allTasks[i]['status'] == 'feedback') {
            c = true;
            generateTask(feedback, i);
        }
        if (allTasks[i]['status'] == 'done') {
            d = true;
            generateTask(done, i);
        }
    }
}


function generateTask(status, i) {
    status.innerHTML += generateMiniTaskHTML(i);
    checkPriorityAtAllTasks(i);
    checkCategoryBackroundColor(i);
    checkUserColor(i);
}


function generateEmptyText(todo, progress, feedback, done) {
    if (a == false) {
        todo.innerHTML = generateEmptyTodoText();
    }
    if (b == false) {
        progress.innerHTML = generateEmptyProgressText();
    }
    if (c == false) {
        feedback.innerHTML = generateEmptyFeedbackText();
    }
    if (d == false) {
        done.innerHTML = generateEmptyDoneText();
    }
}


function resetParameter() {
    a = false;
    b = false;
    c = false;
    d = false;
}


function checkPriorityAtAllTasks(i) {
    let prio = allTasks[i]['prio'];
    let image = document.getElementById(`task-prio-img${i}`);
    if (prio == 'urgent') {
        image.src = "assets/img/urgent.svg"
    }
    if (prio == 'medium') {
        image.src = "assets/img/medium.svg"
    }
    if (prio == 'low') {
        image.src = "assets/img/low.svg"
    }
}


function showFloatingAddTask(actualStatus) {
    document.getElementById('dark-body').classList.remove('d-none');
    document.getElementById('floating-addTask').classList.add('show-floating-addTask');
    document.getElementById('floating-addTask').innerHTML = generateFloatingTaskHTML();
    getCurrentUserBoard();
    newStatusParameter = actualStatus;
}


function closeFloatingAddTask() {
    document.getElementById('dark-body').classList.add('d-none');
    document.getElementById('floating-addTask').classList.remove('show-floating-addTask');
}


function openTaskDetails(i) {
    document.getElementById('dark-body').classList.remove('d-none');
    document.getElementById('dark-body').innerHTML = generateTaskDetailsHTML(i);
    checkUrgencyAtTaskDetails(i);
    checkCategoryBackroundAtDetails(i);
    checkUserColorAtDetails(i);
}


function openTaskDetailsPartTwo(i) {
    document.getElementById('dark-body').innerHTML = generateTaskDetailsHTMLPartTwo(i);
    document.getElementById('overlay-title').value = allTasks[i]['title'];
    document.getElementById('overlay-description').value = allTasks[i]['description'];
    document.getElementById('overlay-date').value = allTasks[i]['date'];
    showActiveUrgencyAtTaskDetails(i);
    setCircleInformationAtDetailsPartTwo(i);
}


function closeTaskDetails() {
    document.getElementById('dark-body').classList.add('d-none');
    document.getElementById('dark-body').innerHTML = "";
}


function createFloatingTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let category = selectedCategory;
    let assign = document.getElementById('assign').value;
    color = newSelectedColor;
    let initials = assign.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    let task = {
        'initials': initials,
        'title': title,
        'description': description,
        'date': date,
        'category': category,
        'assign': assign,
        'status': newStatusParameter,
        'prio': checkPrio(),
        'color': color,
    }
    pushFloatingTasks(title, description, date, category, assign, task);
}


function pushFloatingTasks(title, description, date, category, assign, task) {
    checkFormInputs(title, description, date);
    if (prio > 0 && title != "" && description != "" && date != "" && category != 0 && assign != "") {
        allTasks.push(task);
        removeRequiredMessages();
        pushTasksToBackend();
        closeFloatingAddTask();
        prepareRenderTasks();
        showAddedTaskMessageBoard();
    }
}


function showAddedTaskMessageBoard() {
    document.getElementById('task-added-message-board').classList.add('show-task-added-message');
    closeAddedMessageBoard();
}


function closeAddedMessageBoard() {
    setTimeout(function () {
        document.getElementById('task-added-message-board').classList.remove('show-task-added-message');
    }, 1500);
}



function checkUrgencyAtTaskDetails(i) {
    if (allTasks[i]['prio'] == 'urgent') {
        document.getElementById('overlay-urgencybox').style.background = '#FF3D00';
        document.getElementById('overlay-prio-text').innerHTML = 'Urgent'
        document.getElementById('overlay-urgency-image').src = 'assets/img/urgent-white.svg';
    }
    if (allTasks[i]['prio'] == 'medium') {
        document.getElementById('overlay-urgencybox').style.background = '#FFA800';
        document.getElementById('overlay-prio-text').innerHTML = 'Medium'
        document.getElementById('overlay-urgency-image').src = 'assets/img/medium-white.svg';
    }
    if (allTasks[i]['prio'] == 'low') {
        document.getElementById('overlay-urgencybox').style.background = '#7AE229';
        document.getElementById('overlay-prio-text').innerHTML = 'Low'
        document.getElementById('overlay-urgency-image').src = 'assets/img/low-white.svg';
    }
}


function showActiveUrgencyAtTaskDetails(i) {
    if (allTasks[i]['prio'] == 'urgent') {
        choosePrioUrgent();
    }
    if (allTasks[i]['prio'] == 'medium') {
        choosePrioMedium();
    }
    if (allTasks[i]['prio'] == 'low') {
        choosePrioLow();
    }
}


function updateTheTask(i) {
    let newTitle = document.getElementById('overlay-title').value;
    let newDescription = document.getElementById('overlay-description').value;
    let newDate = document.getElementById('overlay-date').value;
    let newAssign = document.getElementById('overlay-assign').value
    let newInitials = newAssign.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    allTasks[i]['title'] = newTitle;
    allTasks[i]['description'] = newDescription;
    allTasks[i]['date'] = newDate;
    allTasks[i]['assign'] = newAssign;
    allTasks[i]['initials'] = newInitials;
    allTasks[i]['prio'] = checkPrio();
    pushTasksToBackend();
    closeTaskDetails();
    prepareRenderTasks();
}


function deleteTask(i) {
    allTasks.splice(i, 1);
    pushTasksToBackend();
    prepareRenderTasks();
    closeTaskDetails();
}


function searchTasks() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    cleanBoard();
    for (let i = 0; i < allTasks.length; i++) {
        let title = allTasks[i]['title'].toLowerCase().includes(search);
        let description = allTasks[i]['description'].toLowerCase().includes(search);
        if (title || description) {
            prepareRenderAfterSearch(i);
            checkPriorityAtAllTasks(i);
            checkCategoryBackroundColor(i);
            checkUserColor(i);
        }
    }
}

function prepareRenderAfterSearch(i) {
    let todo = document.getElementById('board-column-todo');
    let progress = document.getElementById('board-column-progress');
    let feedback = document.getElementById('board-column-feedback');
    let done = document.getElementById('board-column-done');
    renderAfterSearch(todo, progress, feedback, done, i);
}


function renderAfterSearch(todo, progress, feedback, done, i) {
    if (allTasks[i]['status'] == 'todo') {
        todo.innerHTML += generateMiniTaskHTML(i);
    }
    if (allTasks[i]['status'] == 'progress') {
        progress.innerHTML += generateMiniTaskHTML(i);
    }
    if (allTasks[i]['status'] == 'feedback') {
        feedback.innerHTML += generateMiniTaskHTML(i);
    }
    if (allTasks[i]['status'] == 'done') {
        done.innerHTML += generateMiniTaskHTML(i);
    }
}


function cleanBoard() {
    document.getElementById('board-column-todo').innerHTML = "";
    document.getElementById('board-column-progress').innerHTML = "";
    document.getElementById('board-column-feedback').innerHTML = "";
    document.getElementById('board-column-done').innerHTML = "";
}


function hideSearchIcon() {
    document.getElementById('search-vector').classList.add('d-none');
    document.getElementById('search-icon').classList.add('d-none');
}


function showSearchIcon() {
    document.getElementById('search-vector').classList.remove('d-none');
    document.getElementById('search-icon').classList.remove('d-none');
}


function checkCategoryBackroundColor(i) {
    let background = document.getElementById(`board-category${i}`);
    background.classList.add(`${allTasks[i]['color']}`);
}


function checkCategoryBackroundAtDetails(i) {
    let background = document.getElementById('task-overlay-category');
    background.classList.add(`${allTasks[i]['color']}`);
}


function generateBackgroundColor(background, i) {
    if (allTasks[i]['category'] == 'Sales') {
        background.classList.add('sales');
    }
    if (allTasks[i]['category'] == 'Marketing') {
        background.classList.add('marketing');
    }
    if (allTasks[i]['category'] == 'Media') {
        background.classList.add('media');
    }
    if (allTasks[i]['category'] == 'Backoffice') {
        background.classList.add('backoffice');
    }
    if (allTasks[i]['category'] == 'Design') {
        background.classList.add('design');
    }
}


function checkUserColor(i) {
    let color = document.getElementById(`board-bottom-circle${i}`);
    generateUserColor(color, i);
}


function checkUserColorAtDetails(i) {
    let color = document.getElementById('task-overlay-circle');
    generateUserColor(color, i);
}


function generateUserColor(color, i) {
    if (allTasks[i]['assign'] == 'Edna der Hund') {
        color.classList.add('user1');
    }
    if (allTasks[i]['assign'] == 'Anke Fries') {
        color.classList.add('user2');
    }
    if (allTasks[i]['assign'] == 'Marcus Haas') {
        color.classList.add('user3');
    }
    if (allTasks[i]['assign'] == 'Guest') {
        color.classList.add('user-guest');
    }
}


function setCircleInformationAtDetailsPartTwo(i) {
    let circle = document.getElementById('part-two-circle');
    if (allTasks[i]['assign'] == 'Edna der Hund') {
        circle.classList.add('user1');
        circle.innerHTML = allTasks[i]['initials'];
    }
    if (allTasks[i]['assign'] == 'Anke Fries') {
        circle.classList.add('user2');
        circle.innerHTML = allTasks[i]['initials'];
    }
    if (allTasks[i]['assign'] == 'Marcus Haas') {
        circle.classList.add('user3');
        circle.innerHTML = allTasks[i]['initials'];
    }
    if (allTasks[i]['assign'] == 'Guest') {
        circle.classList.add('user-guest');
        circle.innerHTML = allTasks[i]['initials'];
    }
}


function showActiveCategorieBoard() {
    setTimeout(function () {
        document.getElementById('nav-categories-1').classList.add('active-categorie');
        document.getElementById('nav-text-1').style.color = 'white';
        document.getElementById('nav-image-1').style.opacity = '1';
        document.getElementById('nav-categories-rs-1').classList.add('active-categorie');
        document.getElementById('nav-categories-rs-1').style.color = 'white';
        document.getElementById('nav-image-rs-1').style.opacity = '1';
    }, 200);
}


function moveToAddTask() {
    window.location.href = 'add-task.html';
}


function getCurrentUserBoard() {
    document.getElementById('option').innerHTML = activeUser[0];
}
let allTasks = [];
let dragID;

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
    renderTasks();
}


async function initBoard() {
    await includeHTML();
    showActiveCategorieBoard();
    loadTasksFromBackend();
    renderTasks();
}


function renderTasks() {
    renderToDo();
    renderProgress();
    renderFeedback();
    renderDone();
}


function renderToDo() {
    let todo = document.getElementById('board-column-todo');
    let x = false;
    todo.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['status'] == 'todo') {
            todo.innerHTML += generateMiniTaskHTML(i);
            checkPriorityAtAllTasks(i);
            checkCategoryBackroundColor(i);
            checkUserColor(i);
            x = true;
        }
    }
    if (x == false) {
        todo.innerHTML = generateEmptyTodoText();
    }
}


function renderProgress() {
    let progress = document.getElementById('board-column-progress');
    let x = false;
    progress.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['status'] == 'progress') {
            progress.innerHTML += generateMiniTaskHTML(i);
            checkPriorityAtAllTasks(i);
            checkCategoryBackroundColor(i);
            checkUserColor(i);
            x = true;
        }
    }
    if (x == false) {
        progress.innerHTML = generateEmptyProgressText();
    }
}


function renderFeedback() {
    let feedback = document.getElementById('board-column-feedback');
    let x = false;
    feedback.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['status'] == 'feedback') {
            feedback.innerHTML += generateMiniTaskHTML(i);
            checkPriorityAtAllTasks(i);
            checkCategoryBackroundColor(i);
            checkUserColor(i);
            x = true;
        }
    }
    if (x == false) {
        feedback.innerHTML = generateEmptyFeedbackText();
    }
}


function renderDone() {
    let done = document.getElementById('board-column-done');
    let x = false;
    done.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['status'] == 'done') {
            done.innerHTML += generateMiniTaskHTML(i);
            checkPriorityAtAllTasks(i);
            checkCategoryBackroundColor(i);
            checkUserColor(i);
            x = true;
        }
    }
    if (x == false) {
        done.innerHTML = generateEmptyDoneText();
    }
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


function showFloatingAddTask() {
    document.getElementById('dark-body').classList.remove('d-none');
    document.getElementById('floating-addTask').classList.add('show-floating-addTask');
    document.getElementById('floating-addTask').innerHTML = generateFloatingTaskHTML();
    getCurrentUserBoard();
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
    pushFloatingTasks(title, description, date, category, assign, task);
}


function pushFloatingTasks(title, description, date, category, assign, task) {
    checkFormInputs();
    if (prio > 0 && title != "" && description != "" && date != "" && category != "" && assign != "") {
        allTasks.push(task);
        removeRequiredMessages();
        showAddedTaskMessageBoard();
        pushTasksToBackend();
        closeFloatingAddTask();
        renderTasks();
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
    renderTasks();
}


function deleteTask(i) {
    allTasks.splice(i, 1);
    pushTasksToBackend();
    renderTasks();
    closeTaskDetails();
}


function searchTasks() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    cleanBoardForSearch();
    for (let i = 0; i < allTasks.length; i++) {
        let title = allTasks[i]['title'].toLowerCase().includes(search);
        let description = allTasks[i]['description'].toLowerCase().includes(search);
        if (title || description) {
            renderToDoAfterSearch(i);
            renderProgressAfterSearch(i);
            renderFeedbackAfterSearch(i);
            renderDoneAfterSearch(i);
            checkPriorityAtAllTasks(i);
            checkCategoryBackroundColor(i);
            checkUserColor(i);
        }
    }
}


function renderToDoAfterSearch(i) {
    let todo = document.getElementById('board-column-todo');
    if (allTasks[i]['status'] == 'todo') {
        todo.innerHTML += generateMiniTaskHTML(i);
    }
}


function renderProgressAfterSearch(i) {
    let progress = document.getElementById('board-column-progress');
    if (allTasks[i]['status'] == 'progress') {
        progress.innerHTML += generateMiniTaskHTML(i);
    }
}


function renderFeedbackAfterSearch(i) {
    let feedback = document.getElementById('board-column-feedback');
    if (allTasks[i]['status'] == 'feedback') {
        feedback.innerHTML += generateMiniTaskHTML(i);
    }
}


function renderDoneAfterSearch(i) {
    let done = document.getElementById('board-column-done');
    if (allTasks[i]['status'] == 'done') {
        done.innerHTML += generateMiniTaskHTML(i);
    }
}


function cleanBoardForSearch() {
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


function checkCategoryBackroundAtDetails(i) {
    let background = document.getElementById('task-overlay-category');
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


function checkUserColorAtDetails(i) {
    let color = document.getElementById('task-overlay-circle');
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
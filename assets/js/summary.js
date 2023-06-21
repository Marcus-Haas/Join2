time = new Date();
sumProgress = 0;
sumFeedback = 0;
sumToDo = 0;
sumDone = 0;
urgency = 0;
let deadline = [];
let neededDate;

async function initSummary() {
    await includeHTML();
    showUserName();
    showGreeting();
    showActiveCategorieSummary();
    loadTasksFromBackend();
    getSumOfTasks();
    getUpcomingDeadline();
    showUpcomingDeadline();
}


function linkToBoard() {
    window.location.href = 'board.html';
}


function showActiveCategorieSummary() {
    setTimeout(function () {
        document.getElementById('nav-categories-0').classList.add('active-categorie');
        document.getElementById('nav-text-0').style.color = 'white';
        document.getElementById('nav-image-0').style.opacity = '1';
        document.getElementById('nav-categories-rs-0').classList.add('active-categorie');
        document.getElementById('nav-categories-rs-0').style.color = 'white';
        document.getElementById('nav-image-rs-0').style.opacity = '1';
    }, 200);
}


function showUserName() {
    let name = document.getElementById('summary-user');
    name.innerHTML = activeUser[0];
}


function showGreeting() {
    let greeting = document.getElementById('summary-greeting');
    let hours = time.getHours();
    if (hours <= 11) {
        greeting.innerHTML = 'Good morning,';
    } else if (hours > 11 && hours <= 17) {
        greeting.innerHTML = 'Hi,';
    } else {
        greeting.innerHTML = 'Good evening,';
    }
}


function getSumOfTasks() {
    getTasksInBoard();
    getTasksInProgress();
    getTasksOfFeedback();
    getTasksOfToDo();
    getTasksOfDone();
    getSumOfUrgency();
}


function getTasksInBoard() {
    let sum = allTasks.length;
    let number = document.getElementById('sum-of-tasks');
    number.innerHTML = sum;
}


function getTasksInProgress() {
    let progressbox = document.getElementById('sum-of-progress');
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['status'] == 'progress') {
            sumProgress++
        }
    }
    progressbox.innerHTML = sumProgress;
}


function getTasksOfFeedback() {
    let feedbackbox = document.getElementById('sum-of-feedback');
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['status'] == 'feedback') {
            sumFeedback++
        }
    }
    feedbackbox.innerHTML = sumFeedback;
}


function getTasksOfToDo() {
    let todobox = document.getElementById('sum-of-todo');
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['status'] == 'todo') {
            sumToDo++
        }
    }
    todobox.innerHTML = sumToDo;
}


function getTasksOfDone() {
    let donebox = document.getElementById('sum-of-done');
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['status'] == 'done') {
            sumDone++
        }
    }
    donebox.innerHTML = sumDone;
}


function getSumOfUrgency() {
    let urgentbox = document.getElementById('sum-of-urgency');
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['prio'] == 'urgent') {
            urgency++
        }
    }
    urgentbox.innerHTML = urgency;
}


function getUpcomingDeadline() {
    for (let i = 0; i < allTasks.length; i++) {
        let upcomningDeadline = allTasks[i]['date'];
        deadline.push(upcomningDeadline);
    }
    deadline.sort();
    neededDate = deadline[0];
    showUpcomingDeadline();
}


function showUpcomingDeadline() {
    let date = document.getElementById('summary-deadline');
    showDate = new Date(neededDate).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    date.innerHTML = showDate;
}

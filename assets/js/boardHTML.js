function generateFloatingTaskHTML() {
    return /*html*/ `
    <div>
        <div class="close-floating-task" onclick="closeFloatingAddTask()">X</div>
        <span class="add-task-headline">Add Task</span>

        <div class="helper">
            <div class="add-task-leftside">
                <div class="add-task-titlebox">
                    <span class="add-task-text">Title</span>
                    <input class="add-task-input-style" id="title" type="text" placeholder="Enter a title">
                    <span class="add-task-warning-text d-none" id="required-title">This field is required</span>
                </div>
                <div class="add-task-titlebox">
                    <span class="add-task-text">Description</span>
                    <textarea class="add-task-textarea" name="" id="description" cols="30" rows="10"
                        placeholder="Enter a description"></textarea>
                    <span class="add-task-warning-text d-none" id="required-description">This field is required</span>
                </div>
                <div class="add-task-titlebox">
                    <span class="add-task-text">Category</span>
                    <div>
                        <div class="add-task-category-assign" id="category" onclick="openCategoryOptions()">
                            <div class="add-task-category-assign-details">
                                <div class="selected-category-div">
                                    <span id="selected-category">Select task category</span>
                                    <div class="add-task-category-color-before" id="selected-category-color"></div>
                                </div>
                                    <img src="assets/img/select-arrow.png">
                            </div>
                        </div>
                        <span class="add-task-warning-text d-none" id="required-category">Please select a category</span>
                        <div class="category-assign-input-div d-none" id="category-input">
                            <input class="category-assign-inputfield" placeholder="New category name" id="category-inputfield">
                            <div class="category-assign-input-rightside">
                                <img class="category-assign-input-image" src="assets/img/category-x.png" onclick="closeNewCategory()">
                                <div class="category-assign-input-vector"></div>
                                <img class="category-assign-input-image" src="assets/img/category-check.png" onclick="saveNewCategory()">
                            </div>
                        </div>
                        <div class="category-colors-div d-none" id="new-colors-option">
                            <div class="category-colors first-color" id="selection-circle-0"
                                    onclick="setNewCategoryColor(0, 'first-color')"></div>
                            <div class="category-colors second-color" id="selection-circle-1"
                                    onclick="setNewCategoryColor(1, 'second-color')"></div>
                            <div class="category-colors third-color" id="selection-circle-2"
                                    onclick="setNewCategoryColor(2, 'third-color')"></div>
                            <div class="category-colors fourth-color" id="selection-circle-3"
                                    onclick="setNewCategoryColor(3, 'fourth-color')"></div>
                            <div class="category-colors fifth-color" id="selection-circle-4"
                                    onclick="setNewCategoryColor(4, 'fifth-color')"></div>
                            <div class="category-colors sixth-color" id="selection-circle-5"
                                    onclick="setNewCategoryColor(5, 'sixth-color')"></div>
                        </div>
                        <div class="add-task-category-assign-options d-none" id="category-options"></div>
                    </div>
                </div>
                <div class="add-task-titlebox">
                    <span class="add-task-text">Assigned to</span>
                    <div>
                            <div class="add-task-category-assign" id="assign">
                                <div class="add-task-category-assign-details" id="assign-onclick" onclick="openAssignOptions()">
                                    <span class="selected-assign" id="selected-assign">Select contacts to assign</span>
                                    <img src="assets/img/select-arrow.png">
                                </div>
                            </div>
                            <span class="add-task-warning-text d-none" id="required-assign">Please select a
                                contact</span>
                            <div class="category-assign-input-div d-none" id="assign-input">
                                <input class="category-assign-inputfield" placeholder="New contact name"
                                    id="assign-inputfield">
                                <div class="category-assign-input-rightside">
                                    <img class="category-assign-input-image" src="assets/img/category-x.png" onclick="closeNewAssign()">
                                    <div class="category-assign-input-vector"></div>
                                    <img class="category-assign-input-image" src="assets/img/category-check.png" onclick="saveNewAssign()">
                                </div>
                            </div>
                            <div class="add-task-category-assign-options d-none" id="assign-options"></div>
                            <div class="assign-circle-div" id="assign-circle"></div>
                        </div>
                </div>
            </div>

            <div class="add-task-vector"></div>

            <div class="add-task-rightside">
                <div class="add-task-titlebox">
                    <span class="add-task-text">Due date</span>
                    <input class="add-task-input-style" id="date" type="date" onclick="disablePastDates()">
                    <span class="add-task-warning-text d-none" id="required-date">This field is required</span>
                </div>
                <div class="add-task-titlebox">
                    <span class="add-task-text">Prio</span>
                    <div class="add-task-prio-main">
                        <div class="add-task-priobox" id="prio-urgent" onclick="choosePrioUrgent()">
                            <span>Urgent</span>
                            <img class="add-task-priobox-image" id="urgent-img" src="assets/img/urgent.svg">
                        </div>
                        <div class="add-task-priobox" id="prio-medium" onclick="choosePrioMedium()">
                            <span>Medium</span>
                            <img class="add-task-priobox-image" id="medium-img" src="assets/img/medium.svg">
                        </div>
                        <div class="add-task-priobox" id="prio-low" onclick="choosePrioLow()">
                            <span>Low</span>
                            <img class="add-task-priobox-image" id="low-img" src="assets/img/low.svg">
                        </div>
                    </div>
                    <span class="add-task-warning-text d-none" id="required-prio">Please select prio</span>
                </div>
            </div>
        </div>

        <div class="add-task-btns">
            <button class="add-task-clear-btn" onclick="closeFloatingAddTask()">Cancel
                <span>X</span>
            </button>
            <button class="add-task-create-btn" onclick="createFloatingTask()">Create Task
                <img src="assets/img/overlay-add-check.svg">
            </button>
        </div>
    </div>
    `;
}


function generateMiniTaskHTML(i) {
    return /*html*/ `
    <div class="drag-and-drop-element" id="x" draggable="true" ondragstart="drag(event, ${i})" onclick="openTaskDetails(${i})">
        <div class="board-categorie" id="board-category${i}">${allTasks[i]['category']}</div>
        <div class="board-details">
            <span class="board-details-title">${allTasks[i]['title']}</span>
            <span class="board-details-description">${allTasks[i]['description']}</span>
        </div>
        <div class="board-bottom-frame">
            <div class="board-bottom-ciclebox" id="circlebox${i}">
                <!--<div class="board-bottom-circle" id="board-bottom-circle${i}">${allTasks[i]['initials']}</div>-->
                <!---<div class="board-bottom-circle-2">MH</div>--->
            </div>
            <div>
                <img id="task-prio-img${i}" src="">
            </div>
        </div>
        <div class="move-task-box" onclick="doNotClose(event)">
            <div class="board-move-task" id="move-task-${i}" onclick="openMoveTaskMobile(${i})">Move Task</div>
            <div class="move-task-options-main d-none" id="board-move-task-${i}">
            <div class="move-task-options" onclick="moveTaskToTodo(${i})">To do</div>
            <div class="move-task-options" onclick="moveTaskToProgress(${i})">In progress</div>
            <div class="move-task-options" onclick="moveTaskToFeedback(${i})">Awaiting feedback</div>
            <div class="move-task-options" onclick="moveTaskToDone(${i})">Done</div>
            </div>
        </div>
    </div>
    `;
}


function generateTaskDetailsHTML(i) {
    return /*html*/ `
     <div class="frame-for-task-overlay">
        <div class="close-task-overlay" >
            <span class="closing" onclick="closeTaskDetails()">X</span>
            <img class="board-closing-rs" src="assets/img/arrow-left-black.svg" onclick="closeTaskDetails()">
        </div>
        <div class="task-overlay-category" id="task-overlay-category">${allTasks[i]['category']}</div>
        <span class="task-overlay-title">${allTasks[i]['title']}</span>
        <span class="task-overlay-description">${allTasks[i]['description']}</span>
        <div class="task-overlay-gap">
            <span class="task-overlay-bold-text">Due date:</span>
            <span class="task-overlay-text">${allTasks[i]['date']}</span>
        </div>
        <div class="task-overlay-gap">
            <span class="task-overlay-bold-text">Priority:</span>
            <div class="task-overlay-urgencybox" id="overlay-urgencybox">
                <span id="overlay-prio-text"></span>
                <img id="overlay-urgency-image" src="assets/img/low.svg">
            </div>
        </div>
        <span class="task-overlay-bold-text">Assigned To:</span>
        <div class="task-overlay-assigned-users" id="assigned-users-${i}"></div>
        <div class="task-overlay-btns">
            <div class="task-overlay-delete" onclick="deleteTask(${i})"></div>
            <div class="task-overlay-edit" onclick="openTaskDetailsPartTwo(${i})">
                <img src="assets/img/task-overlay-pen-white.svg">
            </div>
            <div class="task-overlay-btns-rs">
                <img class="board-delete-btn-rs" src="assets/img/delete.png" onclick="deleteTask(${i})">
                <img class="board-edit-btn-rs" src="assets/img/pen-responsive.png" onclick="openTaskDetailsPartTwo(${i})">
            </div>
        </div>
    </div>
    `;
}

function generateTaskDetailsHTMLPartTwo(i) {
    return /*html*/ `
     <div class="frame-for-task-overlay">
        <div class="close-task-overlay" >
            <span class="closing" onclick="closeTaskDetails()">X</span>
            <img class="board-closing-rs" src="/assets/img/arrow-left-black.svg" onclick="closeTaskDetails()">
        </div>
        <div class="task-overlay-edit-div">
            <span class="task-overlay-text">Title</span>
            <input class="task-overlay-input-title" id="overlay-title" type="text">
        </div>
        <div class="task-overlay-edit-div">
            <span class="task-overlay-text">Description</span>
            <textarea class="task-overlay-textarea" name="" id="overlay-description" cols="30" rows="10"></textarea>
        </div>
        <div class="task-overlay-edit-div">
            <span class="task-overlay-text">Due date</span>
            <input class="task-overlay-input-title" type="date" name="" id="overlay-date">
        </div>
        <div class="task-overlay-edit-div">
            <span class="task-overlay-text">Prio</span>
            <div class="task-overlay-prio-main">
                <div class="add-task-priobox" id="prio-urgent" onclick="choosePrioUrgent()">
                    <span>Urgent</span>
                    <img class="add-task-priobox-image" id="urgent-img" src="assets/img/urgent.svg">
                </div>
                <div class="add-task-priobox" id="prio-medium" onclick="choosePrioMedium()">
                    <span>Medium</span>
                    <img class="add-task-priobox-image" id="medium-img" src="assets/img/medium.svg">
                </div>
                <div class="add-task-priobox" id="prio-low" onclick="choosePrioLow()">
                    <span>Low</span>
                    <img class="add-task-priobox-image" id="low-img" src="assets/img/low.svg">
                </div>
            </div>
        </div>
        <div class="task-overlay-edit-div">
            <span class="task-overlay-text">Assigned to</span>
            <div>
                            <div class="add-task-category-assign" id="assign">
                                <div class="add-task-category-assign-details" id="assign-onclick" onclick="openAssignOptions()">
                                    <span class="selected-assign" id="selected-assign">Select contacts to assign</span>
                                    <img src="assets/img/select-arrow.png">
                                </div>
                            </div>
                            <span class="add-task-warning-text d-none" id="required-assign">Please select a
                                contact</span>
                            <div class="category-assign-input-div d-none" id="assign-input">
                                <input class="category-assign-inputfield" placeholder="New contact name"
                                    id="assign-inputfield">
                                <div class="category-assign-input-rightside">
                                    <img class="category-assign-input-image" src="assets/img/category-x.png"
                                        onclick="closeNewAssign()">
                                    <div class="category-assign-input-vector"></div>
                                    <img class="category-assign-input-image" src="assets/img/category-check.png"
                                        onclick="saveNewAssign()">
                                </div>
                            </div>
                            <div class="add-task-category-assign-options d-none" id="assign-options"></div>
                            <div class="assign-circle-div" id="assign-circle"></div>
                        </div>
        </div>
        <div class="task-overlay-ok-btn-mother">
            <div class="task-overlay-ok-btn" onclick="updateTheTask(${i})">
                <span>Ok</span>
                <img src="assets/img/task-overlay-check.svg">
            </div>
        </div>
    </div>
    `;
}


function generateFloatingTaskHTMLAtContacts() {
    return /*html*/ `
    <div>
        <div class="close-floating-task" onclick="closeFloatingAddTask()">X</div>
        <span class="add-task-headline">Add Task</span>

        <div class="helper">
            <div class="add-task-leftside">
                <div class="add-task-titlebox">
                    <span class="add-task-text">Title</span>
                    <input class="add-task-input-style" id="title" type="text" placeholder="Enter a title">
                    <span class="add-task-warning-text d-none" id="required-title">This field is required</span>
                </div>
                <div class="add-task-titlebox">
                    <span class="add-task-text">Description</span>
                    <textarea class="add-task-textarea" name="" id="description" cols="30" rows="10"
                        placeholder="Enter a description"></textarea>
                    <span class="add-task-warning-text d-none" id="required-description">This field is required</span>
                </div>
                <div class="add-task-titlebox">
                    <span class="add-task-text">Category</span>
                    <div>
                        <div class="add-task-category-assign" id="category" onclick="openCategoryOptions()">
                            <div class="add-task-category-assign-details">
                                <div class="selected-category-div">
                                    <span id="selected-category">Select task category</span>
                                    <div class="add-task-category-color-before" id="selected-category-color"></div>
                                </div>
                                    <img src="assets/img/select-arrow.png">
                            </div>
                        </div>
                        <span class="add-task-warning-text d-none" id="required-category">Please select a category</span>
                        <div class="category-assign-input-div d-none" id="category-input">
                            <input class="category-assign-inputfield" placeholder="New category name" id="category-inputfield">
                            <div class="category-assign-input-rightside">
                                <img class="category-assign-input-image" src="assets/img/category-x.png" onclick="closeNewCategory()">
                                <div class="category-assign-input-vector"></div>
                                <img class="category-assign-input-image" src="assets/img/category-check.png" onclick="saveNewCategory()">
                            </div>
                        </div>
                        <div class="category-colors-div d-none" id="new-colors-option">
                            <div class="category-colors first-color" id="selection-circle-0"
                                    onclick="setNewCategoryColor(0, 'first-color')"></div>
                            <div class="category-colors second-color" id="selection-circle-1"
                                    onclick="setNewCategoryColor(1, 'second-color')"></div>
                            <div class="category-colors third-color" id="selection-circle-2"
                                    onclick="setNewCategoryColor(2, 'third-color')"></div>
                            <div class="category-colors fourth-color" id="selection-circle-3"
                                    onclick="setNewCategoryColor(3, 'fourth-color')"></div>
                            <div class="category-colors fifth-color" id="selection-circle-4"
                                    onclick="setNewCategoryColor(4, 'fifth-color')"></div>
                            <div class="category-colors sixth-color" id="selection-circle-5"
                                    onclick="setNewCategoryColor(5, 'sixth-color')"></div>
                        </div>
                        <div class="add-task-category-assign-options d-none" id="category-options"></div>
                    </div>
                </div>
                <div class="add-task-titlebox">
                    <span class="add-task-text">Assigned to</span>
                    <div>
                            <div class="add-task-category-assign" id="assign">
                                <div class="add-task-category-assign-details" id="assign-onclick" onclick="openAssignOptions()">
                                    <span class="selected-assign" id="selected-assign">Select contacts to assign</span>
                                    <img src="assets/img/select-arrow.png">
                                </div>
                            </div>
                            <span class="add-task-warning-text d-none" id="required-assign">Please select a
                                contact</span>
                            <div class="category-assign-input-div d-none" id="assign-input">
                                <input class="category-assign-inputfield" placeholder="New contact name"
                                    id="assign-inputfield">
                                <div class="category-assign-input-rightside">
                                    <img class="category-assign-input-image" src="assets/img/category-x.png" onclick="closeNewAssign()">
                                    <div class="category-assign-input-vector"></div>
                                    <img class="category-assign-input-image" src="assets/img/category-check.png" onclick="saveNewAssign()">
                                </div>
                            </div>
                            <div class="add-task-category-assign-options d-none" id="assign-options"></div>
                            <div class="assign-circle-div" id="assign-circle"></div>
                        </div>
                </div>
            </div>
            <div class="add-task-vector"></div>
            <div class="add-task-rightside">
                <div class="add-task-titlebox">
                    <span class="add-task-text">Due date</span>
                    <input class="add-task-input-style" id="date" type="date" onclick="disablePastDates()">
                    <span class="add-task-warning-text d-none" id="required-date">This field is required</span>
                </div>
                <div class="add-task-titlebox">
                    <span class="add-task-text">Prio</span>
                    <div class="add-task-prio-main">
                        <div class="add-task-priobox" id="prio-urgent" onclick="choosePrioUrgent()">
                            <span>Urgent</span>
                            <img class="add-task-priobox-image" id="urgent-img" src="assets/img/urgent.svg">
                        </div>
                        <div class="add-task-priobox" id="prio-medium" onclick="choosePrioMedium()">
                            <span>Medium</span>
                            <img class="add-task-priobox-image" id="medium-img" src="assets/img/medium.svg">
                        </div>
                        <div class="add-task-priobox" id="prio-low" onclick="choosePrioLow()">
                            <span>Low</span>
                            <img class="add-task-priobox-image" id="low-img" src="assets/img/low.svg">
                        </div>
                    </div>
                    <span class="add-task-warning-text d-none" id="required-prio">Please select prio</span>
                </div>
            </div>
        </div>

        <div class="add-task-btns">
            <button class="add-task-clear-btn" onclick="closeFloatingAddTask()">Cancel
                <span>X</span>
            </button>
            <button class="add-task-create-btn" onclick="createTask()">Create Task
                <img src="assets/img/overlay-add-check.svg">
            </button>
        </div>
    </div>
    `;
}


function generateEmptyTodoText() {
    return /*html*/ `
        <div class="board-empty-task">No tasks to do</div>
    `;
}

function generateEmptyFeedbackText() {
    return /*html*/ `
        <div class="board-empty-task">No tasks await feedback</div>
    `;
}

function generateEmptyProgressText() {
    return /*html*/ `
        <div class="board-empty-task">No tasks in progress</div>
    `;
}


function generateEmptyDoneText() {
    return /*html*/ `
        <div class="board-empty-task">No tasks are done</div>
    `;
}


function generateUserAssignCirclesHTML(i, j) {
    return /*html*/`
        <div class="board-bottom-circle circle-color-${allTasks[i]['assignNumber'][j]}" id="board-bottom-circle${j}">
            ${allTasks[i]['initials'][j]}
        </div>
    `;
}


function generateCirclesForDetailsHTML(i, j) {
    return /*html*/`
        <div class="task-overlay-users">
            <div class="task-overlay-circle circle-color-${allTasks[i]['assignNumber'][j]}" id="task-overlay-circle">
                ${allTasks[i]['initials'][j]}
            </div>
            <span class="task-overlay-text">${allTasks[i]['assign'][j]}</span>
        </div>
    `;
}
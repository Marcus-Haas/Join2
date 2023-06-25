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
                        <div class="add-task-category" id="category" onclick="openCategoryOptions()">
                            <div class="add-task-category-details">
                                <div class="selected-category-div">
                                    <span id="selected-category">Select task category</span>
                                    <div class="add-task-category-color-before" id="selected-category-color"></div>
                                </div>
                                    <img src="assets/img/select-arrow.png">
                            </div>
                        </div>
                        <span class="add-task-warning-text d-none" id="required-category">Please select a category</span>
                        <div class="category-input-div d-none" id="category-input">
                            <input class="category-inputfield" placeholder="New category name" id="category-inputfield">
                            <div class="category-input-rightside">
                                <img class="category-input-image" src="assets/img/category-x.png" onclick="closeNewCategory()">
                                <div class="category-input-vector"></div>
                                <img class="category-input-image" src="assets/img/category-check.png" onclick="saveNewCategory()">
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
                        <div class="add-task-category-options d-none" id="category-options"></div>
                    </div>
                </div>
                <div class="add-task-titlebox">
                    <span class="add-task-text">Assigned to</span>
                    <select class="add-task-input-style" name="" id="assign">
                        <option selected disabled hidden>Select contacts to assign</option>
                        <option>Marcus Haas</option>
                        <option>Anke Fries</option>
                        <option>Edna der Hund</option>
                        <option id="option"></option>
                    </select>
                </div>
            </div>

            <div class="add-task-vector"></div>

            <div class="add-task-rightside">
                <div class="add-task-titlebox">
                    <span class="add-task-text">Due date</span>
                    <input class="add-task-input-style" id="date" type="date">
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
            <div class="board-bottom-ciclebox">
                <div class="board-bottom-circle" id="board-bottom-circle${i}">${allTasks[i]['initials']}</div>
                <!---<div class="board-bottom-circle-2">MH</div>--->
            </div>
            <div>
                <img id="task-prio-img${i}" src="">
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
            <img class="board-closing-rs" src="/assets/img/arrow-left-black.svg" onclick="closeTaskDetails()">
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
        <div class="task-overlay-gap">
            <div class="task-overlay-circle" id="task-overlay-circle">${allTasks[i]['initials']}</div>
            <span class="task-overlay-text">${allTasks[i]['assign']}</span>
        </div>
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
            <select class="task-overlay-input-title" name="" id="overlay-assign">
                <option selected disabled hidden>Select contacts to assign</option>
                <option>Marcus Haas</option>
                <option>Anke Fries</option>
                <option>Edna der Hund</option>
                <option id="option"></option>
            </select>
        </div>
        <div class="task-overlay-edit-circlebox">
            <div class="task-overlay-circle" id="part-two-circle">AF</div>
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
                        <div class="add-task-category" id="category" onclick="openCategoryOptions()">
                            <div class="add-task-category-details">
                                <div class="selected-category-div">
                                    <span id="selected-category">Select task category</span>
                                    <div class="add-task-category-color-before" id="selected-category-color"></div>
                                </div>
                                    <img src="assets/img/select-arrow.png">
                            </div>
                        </div>
                        <span class="add-task-warning-text d-none" id="required-category">Please select a category</span>
                        <div class="category-input-div d-none" id="category-input">
                            <input class="category-inputfield" placeholder="New category name" id="category-inputfield">
                            <div class="category-input-rightside">
                                <img class="category-input-image" src="assets/img/category-x.png" onclick="closeNewCategory()">
                                <div class="category-input-vector"></div>
                                <img class="category-input-image" src="assets/img/category-check.png" onclick="saveNewCategory()">
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
                        <div class="add-task-category-options d-none" id="category-options"></div>
                    </div>
                </div>
                <div class="add-task-titlebox">
                    <span class="add-task-text">Assigned to</span>
                    <select class="add-task-input-style" name="" id="assign">
                        <option selected disabled hidden>Select contacts to assign</option>
                        <option>Marcus Haas</option>
                        <option>Anke Fries</option>
                        <option>Edna der Hund</option>
                        <option id="option"></option>
                    </select>
                </div>
            </div>

            <div class="add-task-vector"></div>

            <div class="add-task-rightside">
                <div class="add-task-titlebox">
                    <span class="add-task-text">Due date</span>
                    <input class="add-task-input-style" id="date" type="date">
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

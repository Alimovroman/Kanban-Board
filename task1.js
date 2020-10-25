let profileMenu = document.getElementsByClassName("profile_menu");
let arrowButton = document.getElementsByClassName("profile_button");
let taskBlock = document.getElementsByClassName("task_block");
let taskList = document.getElementsByClassName("task_list");
let addCardButton = document.getElementsByClassName("add_card_button");
let taskListLi = document.getElementsByClassName("task_list_li");
let activTask = document.getElementsByClassName("activ_task");
let finishedTasks = document.getElementsByClassName("finished_tasks");
let buttonCreateNewList = document.getElementsByClassName("button_create_new_list");
let main = document.getElementsByClassName("main")
let nameTaskBlock = document.getElementsByClassName("heading_task_block");
let backlogId = document.getElementById("backlog_ul_id");
let readyId = document.getElementById("ready_ul_id");
let inProgressId = document.getElementById("inprogres_ul_id");
let finishedId = document.getElementById("finished_ul_id");
let headerTaskList = document.getElementsByClassName("header_task_list");
let taskBlockMenuDiv = document.getElementsByClassName("task_block_menu");
let buttonDeleteTAskBlock = document.getElementsByClassName("delete_task_block");
let buttonTaskListMenu = document.getElementsByClassName("button_tasklist_menu");
let divMessageMainClear = document.getElementsByClassName("div_message_main_clear")

let backLogArray = JSON.parse(localStorage.getItem("backlog"));
if (backLogArray !== null) {
  taskList[0].innerHTML = "";
  backLogArray.forEach(element => {
    let nameTask = document.createElement('li');
    nameTask.className = "task_list_li";
    nameTask.innerHTML = element;
    taskList[0].append(nameTask);
  });
}
let readyArray = JSON.parse(localStorage.getItem("ready"));
if (readyArray !== null) {
  taskList[1].innerHTML = "";
  readyArray.forEach(element => {
    let nameTask = document.createElement('li');
    nameTask.className = "task_list_li";
    nameTask.innerHTML = element;
    taskList[1].append(nameTask);
  });
}
let inProgressArray = JSON.parse(localStorage.getItem("inProgress"));
if (inProgressArray !== null) {
  taskList[2].innerHTML = "";
  inProgressArray.forEach(element => {
    let nameTask = document.createElement('li');
    nameTask.className = "task_list_li";
    nameTask.innerHTML = element;
    taskList[2].append(nameTask);
  });
}
let finishArray = JSON.parse(localStorage.getItem("finish"));
if (finishArray !== null) {
  taskList[taskList.length-1].innerHTML = "";
  finishArray.forEach(element => {
    let nameTask = document.createElement('li');
    nameTask.className = "task_list_li";
    nameTask.innerHTML = element;
    taskList[taskList.length-1].append(nameTask);
  });
}

function changeStyleDisableButton(num, boolen, background, color, size, color2, size2, cursor ) {
  addCardButton[num].disabled === boolen;
  addCardButton[num].style.background = background;
  addCardButton[num].addEventListener("mouseover", () => {
    changeStyleButtonAddCard(num, color, size);
  });
  addCardButton[num].addEventListener("mouseout", () => {
    changeStyleButtonAddCard(num, color2, size2);
    })
    addCardButton[num].style.cursor = cursor;
}
function changeStyleButtonAddCard(num, color, size) {
    addCardButton[num].style.color = color;
    addCardButton[num].style.fontSize = size;
}
function activationButton() { //дизейбл кнопок
  for (let i = 1; i < addCardButton.length ; i++) {
    if (taskList[i-1].children.length === 0) {
      changeStyleDisableButton(i, true, "#515255", "#5E6C84", "18px", "#5E6C84", "18px", "not-allowed")
    } else {
      changeStyleDisableButton(i, false, "#EBECF0", "#1383c4", "16px", "#5E6C84", "18px", "pointer")
    }
  }
    changeStyleDisableButton(0, false, "#EBECF0", "#1383c4", "16px", "#5E6C84", "18px", "pointer")
}
profileMenu[0].style.display = "none";
function openProfileMenu() { //меню профиля в хедоре
  if (profileMenu[0].style.display === "none") {
    arrowButton[0].style.transform = "rotate(-90deg)"
    profileMenu[0].style.display = "block";
    profileMenu[0].style.zIndex = "1";
  } else {
    arrowButton[0].style.transform = "rotate(90deg)"
    profileMenu[0].style.display = "none";
  }
};

function addBacklog() { //добавление новой задачи в список
  let temporaryNameTask = document.createElement('input');
  temporaryNameTask.className = "task_list_li";
  taskList[0].append(temporaryNameTask);
  temporaryNameTask.focus();
  temporaryNameTask.onblur = function() {
    if (temporaryNameTask.value.trim().length > 0) {
      let nameTask = document.createElement('li');
      nameTask.className = "task_list_li";
      nameTask.innerHTML = temporaryNameTask.value;
      taskList[0].lastChild.replaceWith(nameTask);
      activationButton();
      showActiveTask();
      createTaskInLocalStorage(backlogId, "backlog");
    } else {
      taskList[0].lastChild.remove();
    }
  }
}

function createTaskInLocalStorage(id, nameKey) { // создаем списки задач в localStorage
  let result = [];
  for (let key of id.children) {
    result.push(key.innerHTML);
  }
  localStorage.setItem(nameKey, JSON.stringify(result));
}

function activationAllButtonTask() {
  if (  addCardButton[0] !== undefined ) {
    addCardButton[0].addEventListener("click", addBacklog);
  }
  for (let i = 1; i < addCardButton.length; i++) { //перенос С блока на блок в массиве 
    addCardButton[i].addEventListener("click", () => {
      if (document.documentElement.clientWidth > 480) {
        for ( let nameTask of taskList[i-1].children) {
          nameTask.addEventListener("mousedown", createCloneTaskList);
        }
      } else {
        createCloneTaskForMobileVersion(i)
      }
    });
  }
}

function createCloneTaskForMobileVersion(index) { //переносим список задач для мобильной версии
  let selectTask = document.createElement("select");
  selectTask.className = "select_task";
  let firstClearOption = document.createElement("option");
  firstClearOption.className = "first_clear_option";
  firstClearOption.innerHTML = "";
  selectTask.append(firstClearOption);
  for (let i = 0; i < taskList[index-1].children.length; i++) {
    let newOptionTeg = document.createElement("option");
    newOptionTeg.className = "option";
    newOptionTeg.innerHTML = taskList[index-1].children[i].innerHTML;
    selectTask.append(newOptionTeg);
  }
  taskList[index].append(selectTask);
  selectTask.focus();
  selectTask.onblur = function() {
    if (selectTask.value === "") selectTask.remove();
  }
  function addTaskInUl() {
    let newTaskLi = document.createElement("li");
    newTaskLi.className = "task_list_li";
    newTaskLi.innerHTML = this.value;
    taskList[index].append(newTaskLi);
    selectTask.remove();
    for (let i = 0; i < taskList[index-1].children.length; i++) {
      if(taskList[index-1].children[i].innerHTML === taskList[index].lastChild.innerHTML) {
        taskList[index-1].children[i].remove()
        createTaskInLocalStorage(backlogId, "backlog");
        createTaskInLocalStorage(readyId, "ready");
        createTaskInLocalStorage(inProgressId, "inProgress");
        createTaskInLocalStorage(finishedId, "finish");
        activationButton();
        return
      }
    }
  }
  selectTask.addEventListener("change", addTaskInUl)
}

function createCloneTaskList(event) { //переносим список задач drag and Drop
  for (let i = 0; i < taskList.length; i++) {
    taskList[i].removeEventListener("click", createNewPage)
  }
  let currentDroppable = null;
  let eventTargetLi = event.target;
  let taskBlockForchange = eventTargetLi.parentElement.parentElement.parentElement.nextElementSibling.children[0];
  let mainTaskBlock = eventTargetLi.parentElement;
  let shiftX = event.clientX - eventTargetLi.getBoundingClientRect().left;
  let shiftY = event.clientY - eventTargetLi.getBoundingClientRect().top;
  eventTargetLi.style.position = "absolute";
  eventTargetLi.style.zIndex = "100";
  document.body.append(eventTargetLi);
  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    eventTargetLi.style.left = pageX - shiftX + "px";
    eventTargetLi.style.top = pageY - shiftY + "px";
  }
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    eventTargetLi.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    eventTargetLi.hidden = false;
    if (!elemBelow) return;
    let droppableBelow = elemBelow.closest(".task_block");

    if (currentDroppable != droppableBelow) {
      if (currentDroppable) {
        leaveDroppable(currentDroppable)
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        enterDroppable(currentDroppable);
      }
    }
  }
  
  document.addEventListener("mousemove", onMouseMove);
  eventTargetLi.onmouseup = function() {
    let cloneTaskListLi = document.createElement("li");
    cloneTaskListLi.className = "task_list_li";
    cloneTaskListLi.innerHTML = eventTargetLi.innerHTML;
    if (taskBlockForchange.style.background === "silver") {
      taskBlockForchange.children[1].append(cloneTaskListLi);
      taskBlockForchange.style.background = "";
    } else {
      mainTaskBlock.append(cloneTaskListLi);
      for (let i = 0; i < taskBlock.length; i++) {
        taskBlock[i].style.background = "";
      }
    }
    eventTargetLi.remove()
    createTaskInLocalStorage(backlogId, "backlog");
    createTaskInLocalStorage(readyId, "ready");
    createTaskInLocalStorage(inProgressId, "inProgress");
    createTaskInLocalStorage(finishedId, "finish");
    activationButton()
    
    document.removeEventListener("mousemove", onMouseMove);
    eventTargetLi.onmouseup = null;
    for (let i = 1; i < addCardButton.length; i++) {
      for ( let nameTask of taskList[i-1].children) {
        nameTask.removeEventListener("mousedown", createCloneTaskList);
      }
    }
    for (let i = 0; i < taskList.length; i++) {
      taskList[i].addEventListener("click", createNewPage)
    }
  }
}

function leaveDroppable(elem) {
  elem.style.background = '';
}
function enterDroppable(elem) {
  elem.style.background = 'silver';
}
for (let i = 1; i < addCardButton.length; i++) {
  for ( let nameTask of taskList[i-1].children) {
    nameTask.ondragstart = function() {
      return false
    }
  }
}
/*
function createCloneTaskList() { //создаем клон задачи из таска
  let cloneTaskListLi = document.createElement("li");
  cloneTaskListLi.className = "task_list_li";
  cloneTaskListLi.innerHTML = event.target.innerHTML;
  event.target.parentElement.parentElement.nextElementSibling.children[1].append(cloneTaskListLi);
  event.target.remove();
  createTaskInLocalStorage(backlogId, "backlog");
  createTaskInLocalStorage(readyId, "ready");
  createTaskInLocalStorage(inProgressId, "inProgress");
  createTaskInLocalStorage(finishedId, "finish");
  for (let i = 1; i < taskList.length; i++) {
    
    for ( let nameTask of taskList[i-1].children) {
      nameTask.removeEventListener("click", createCloneTaskList);
    }
  }activationButton()
}
*/

function createNewPage() { // создаем новую страницу при клике на задачу из таска
  let target = event.target;
  if (target.className !== `task_list_li`) {
    return
  }
  let taskPage = open('');
  taskPage.document.write(`<!DOCTYPE html><html><head><title>${event.target.innerHTML}</title><meta charset="utf-8">
  <link href="task1.css" rel="stylesheet"></head>`);
  taskPage.document.write(`<body><header class="header"><div class="heading">Awesome Kanban Board</div><div class="user_info">`);
  taskPage.document.write(`<div class="avatar"><img src="images/avatar.svg" alt="avatar"></div><div><button class="profile_button">></button>`)
  taskPage.document.write(`</div><div class="profile_menu" style="display:none"><div class="empty_square"></div><ul class="profile_ul">`)
  taskPage.document.write(`<li class="profile_li"><button class="menu_profile_button">Profile</button></li>`)
  taskPage.document.write(`<li class="profile_li"><button class="menu_profile_button">Log Out</button></li></ul></div></header>`);
  taskPage.document.write(`<main class="main new_page"><h2 class="title_created_page">${event.target.innerHTML}</h2></main>`)
  taskPage.document.write(`<footer class="footer"><div class="footer_task"><div class="activ_task">${activTask[0].innerHTML}</div>`)
  taskPage.document.write(`<div class="finished_tasks">${finishedTasks[0].innerHTML}</div>`);
  taskPage.document.write(`</div><div class="footer_name">Kanban board by &lt;ROMAN&gt;, &lt;2020&gt;</div></footer></body></html>`);
}

function showActiveTask() { //количество активных и закрытых задач
  let sumActiveTask = taskList[0].children.length ;
  let sumFinishedTask = taskList[taskList.length-1].children.length
  activTask[0].innerHTML = `Activ Task: < ${sumActiveTask} >`
  finishedTasks[0].innerHTML = `Finished tasks: < ${sumFinishedTask} >`
}

function createNewList() { //создаем новый блок для списка задач
  if (main[0].children[0].className === "div_message_main_clear") {
    divMessageMainClear[0].remove()
  }
  let divWrapper = document.createElement("div");
  divWrapper.className = "task_wrapper";
  divWrapper.innerHTML = `<div class="task_block"><div class="header_task_list"><input type="text" class="name_new_list">
  <button class="button_tasklist_menu">...</button>
  </div>
  <ul class="task_list">
  </ul>
  <button class="add_card_button">+ Add Card</button></div>`;
  let nameNewList = document.getElementsByClassName("name_new_list");
  main[0].prepend(divWrapper);
  nameNewList[0].focus();
  nameNewList[0].onblur = function() {
    if (nameNewList[0].value.trim().length > 0) {
      let headerTaskList = document.getElementsByClassName("header_task_list")
      let headingTaskBlock = document.createElement("p");
      headingTaskBlock.className = "heading_task_block";
      headingTaskBlock.innerHTML = nameNewList[0].value;
      headerTaskList[0].firstChild.replaceWith(headingTaskBlock)
      activationAllButtonTask()
      activationButton();
      showActiveTask();
      for (let i = 0; i < taskList.length; i++) {
        taskList[i].addEventListener("click", createNewPage)
      }
      if (addCardButton.length !== 1) {
        addCardButton[1].removeEventListener("click", addBacklog);
      }
      for (let i = 1; i < taskBlock.length; i++) {
        taskBlockMenuDiv[i].remove()
      }
      for (let i = 0; i < taskBlock.length; i++) {
        buttonDeleteTAskBlock[i].removeEventListener("click", deleteBlockTask)  
      }
      for (let i = 0; i < taskBlock.length; i++) {
        buttonDeleteTAskBlock[i].addEventListener("click", deleteBlockTask)  
      }
    } else {
      main[0].firstChild.remove();
      if (main[0].children.length === 0)
      createMessageMainClear()
      for (let i = 0; i < taskBlock.length; i++) {
        buttonDeleteTAskBlock[i].addEventListener("click", deleteBlockTask)  
      }
    }
  }
  createTaskBlockMenu();
}

createTaskBlockMenu()
function createTaskBlockMenu() { // создаем и открываем меню у списка задач
  for (let i = 0; i < taskBlock.length; i++) { 
    let taskBlockMenu = document.createElement("div");
    taskBlockMenu.className = "task_block_menu";
    taskBlockMenu.innerHTML = `<ul><li class="delete_task_block">Delete task block</li></ul>`;
    headerTaskList[i].append(taskBlockMenu);
    taskBlockMenu.style.opacity = "0";
    buttonTaskListMenu[i].addEventListener("click", () => {
    if (taskBlockMenu.style.opacity === "0") {
      taskBlockMenu.style.opacity = "1";
    } else 
      taskBlockMenu.style.opacity = "0";
    })
  }
} 

function createMessageMainClear() {
  let divMainClear = document.createElement("div");
  divMainClear.className = "div_message_main_clear";
  divMainClear.innerHTML = "<p>Создайте новый блок с помощью create new list</p>";
  divMainClear.style.color = "#FFF"
  main[0].append(divMainClear)
}

for (let i = 0; i < taskBlock.length; i++) {
  buttonDeleteTAskBlock[i].addEventListener("click", deleteBlockTask)  
}
function deleteBlockTask() {
  if (main[0].childElementCount === 1) {
    createMessageMainClear()
  }
  event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
  if ( addCardButton[0] !== undefined ) {
    addCardButton[0].removeEventListener("click", createCloneTaskList)
  }
  activationAllButtonTask();
  activationButton();
}

if (taskBlock !== undefined) {
  arrowButton[0].addEventListener("click", openProfileMenu);
}

for (let i = 0; i < taskList.length; i++) {
  taskList[i].addEventListener("click", createNewPage)
}
buttonCreateNewList[0].addEventListener("click", createNewList);
activationButton();
showActiveTask();
activationAllButtonTask();
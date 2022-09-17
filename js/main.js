// getting all required elements
let inputBox = document.querySelector(".add input");
let addBtn = document.querySelector(".add button");

let todoList = document.querySelector(".tasks");
let deleteAllBtn = document.querySelector(".footer button");



// onkeyup event
inputBox.onkeyup = () => {
    let Data = inputBox.value;
    if (Data.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

showTasks(); 

addBtn.onclick = () => {
    let Data = inputBox.value;
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    listArray.push(Data);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    let pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length;
    if (listArray.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }
    let newtask = "";
    listArray.forEach((element, index) => {
        newtask = ` <div class="task">
                            <p>${element}</p>
                            <span class="spanbtn" onclick="deleteTask(${index})";><i class="fa-solid fa-trash-can"></i></span>
                        </div>`;
    });
    todoList.innerHTML += newtask;
    inputBox.value = "";
}

// delete task function
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    
}

// delete all tasks function
deleteAllBtn.onclick = () => {
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}
const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const Error = document.getElementById("errorId");
const deleteAllTasks = document.getElementById("deleteAll");

deleteAllTasks.addEventListener('click', function () {
    taskList.innerHTML = ""
    localStorage.removeItem("tasks")
})

window.addEventListener("load" , function () {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    tasks.forEach((task) => {
        return addTaskToDOM(task)
    })
})

button.addEventListener("click", function () {
    const task = input.value.trim()

    if(task == ""){
        Error.innerText = "Enter a task"
        Error.style.color = "red"
        return 
    }

    addTaskToDOM(task)
    saveTask(task)
    
    Error.innerText = ""
    input.value = ""
})

function addTaskToDOM (task) {
    const li = document.createElement("li")
    li.innerText = task

    const deletBtn = document.createElement("button")
    deletBtn.textContent = "❌"
    deletBtn.addEventListener("click", function () {
        li.remove()
        removeTask(task)
    })

    li.appendChild(deletBtn)
    taskList.appendChild(li)
}

function saveTask (task) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function removeTask (task) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    tasks = tasks.filter((t) => {
        return t !== task
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const TasksStorage = 'new'

const myTask = document.getElementById("task")
const date = document.getElementById("date")
const time = document.getElementById("time")
const save = document.getElementById("save")
const reset = document.getElementById("reset")
const taskRow = document.getElementById("taskRow")
const tasks = getTasksFromStorage();

showTasks();
function getTasksFromStorage(){
    return localStorage.getItem(TasksStorage) == null || localStorage.getItem(TasksStorage) == undefined ? [] : JSON.parse(localStorage.getItem(TasksStorage));
}
function updateTasksStorage(){
    localStorage.setItem(TasksStorage, JSON.stringify(tasks));
}
function addTask(e) {
    e.preventDefault();
    
    document.getElementById("date").focus();

    /*if (tasks.length > 2) {
        return alert("Too Many Notes please Complete One");
    }*/
    tasks.push(new Task(myTask.value, date.value, time.value));
    resetTask();
    showTasks();
    updateTasksStorage();
}
function resetTask() {
    myTask.value = '';
    date.value = '';
    time.value = '';
}
function deleteTask(index) {
    tasks.splice(index, 1);
    showTasks();
    updateTasksStorage();
}

function showTasks() {
    //הוספת להכנת אלמנט
    taskRow.innerHTML = "";

    for (task in tasks) {

        console.log(tasks)
        let taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "col-sm task");

        let description = document.createElement("p");
        description.setAttribute("class", "description");
        description.innerHTML = `${tasks[task].task}<br>`

        let finishDate = document.createElement("div");
        finishDate.setAttribute("class", "date");
        finishDate.innerHTML = `${tasks[task].date}<br>`;
       
        let noteTime = document.createElement("p");
        noteTime.setAttribute("class", "time");
        noteTime.innerHTML = `${tasks[task].time}<br>`

        let escape = document.createElement("p");
        escape.setAttribute("class", "escape glyphicon glyphicon-remove");
        escape.setAttribute("id", "remove");
        escape.innerHTML = `X`;

        escape.addEventListener('click', function callback(e) {
            var child = e.target.parentElement;
            var container = child.parentElement;
            var index = Array.prototype.slice.call(container.children).indexOf(child)
            deleteTask(index);
        });
        taskDiv.appendChild(escape)
        taskDiv.appendChild(description);
        taskDiv.appendChild(finishDate);
        taskDiv.appendChild(noteTime);

        taskRow.appendChild(taskDiv);
    }
}


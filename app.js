// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Function
function addTodo(event) {
    // Prevent form from Submitting (also refreshing)
    event.preventDefault();
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create <li>
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Add Todo to Local localStorage
    saveLocalTodos(todoInput.value);
    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Check mark button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append to List
    todoList.appendChild(todoDiv);
    // Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // Delete Todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo); 
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
    // Check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach( todo => {
        switch(e.target.value) {
            case "all": todo.style.display = "flex";
            break;
            case "completed": if(todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            break;
            case "uncompleted": 
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            break;
        }
    })
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        // Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Create <li>
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // Check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<li class="fas fa-check"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Check mark button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<li class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Append to List
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

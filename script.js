// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todos");

// event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("click", filterTodos);
window.addEventListener("DOMContentLoaded", displayLocalTodos);

// function

function filterTodos(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach((todo) => {
    // checking the value of the option selected
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complete":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "unmarked":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  // check if todos already exist
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    // todos.forEach((todo) => console.log(todo));
    // displayLocalTodos();
  }

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function displayLocalTodos() {
  let todos;
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => updateUI(todo));
  } else {
    return;
  }
}

function deleteFromLocalStorage(todoText) {
  // get items from local storage
  let todos = JSON.parse(localStorage.getItem("todos"));

  // filter the array and give me words that are not equal to the todoText
  todos = todos.filter((todo) => todo !== todoText);

  // save the new array to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteCheck(e) {
  const item = e.target;

  deleteFromLocalStorage(e.target.parentElement.innerText);

  if (item.classList[0] === "delete-btn") {
    item.parentElement.classList.add("fall");
    item.parentElement.addEventListener("transitionend", () => {
      item.parentElement.remove();
    });
  } else if (item.classList[0] === "complete-button") {
    item.parentElement.classList.toggle("complete");
  }
}

function addTodo(e) {
  e.preventDefault();

  updateUI(todoInput.value);

  // add to local storage
  saveLocalTodos(todoInput.value);

  todoInput.value = "";
}

function updateUI(todoText) {
  const todoDiv = document.createElement("div");

  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");

  newTodo.innerText = todoText;

  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  const completedButton = createTodoButton("fas fa-check", "complete-button");

  todoDiv.appendChild(completedButton);

  const deleteButton = createTodoButton("fas fa-trash", "delete-btn");

  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);
}

function createTodoButton(iconClasses, self) {
  const todoBtn = document.createElement("button");
  todoBtn.innerHTML = `<i class="${iconClasses}"></i>`;
  todoBtn.classList.add(`${self}`);

  return todoBtn;
}

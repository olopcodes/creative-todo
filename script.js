// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event Listeners
todoButton.addEventListener("click", addTodo);

// function

function addTodo(e) {
  e.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = "";
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  const completedButton = createTodoButton("fas fa-check", "complete-button");

  todoDiv.appendChild(completedButton);

  const deleteButton = createTodoButton("fas fa-trash", "delete-btn");

  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);

  console.log(todoDiv);
}

function createTodoButton(iconClasses, self) {
  const todoBtn = document.createElement("button");
  todoBtn.innerHTML = `<i class="${iconClasses}"></i>`;
  todoBtn.classList.add(`${self}`);

  return todoBtn;
}

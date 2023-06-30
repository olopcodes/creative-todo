// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todos");

// event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("click", filterTodos);

// function

function filterTodos(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
      case "complete":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      case "uncomplete":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function deleteCheck(e) {
  const item = e.target;

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

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  const completedButton = createTodoButton("fas fa-check", "complete-button");

  todoDiv.appendChild(completedButton);

  const deleteButton = createTodoButton("fas fa-trash", "delete-btn");

  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function createTodoButton(iconClasses, self) {
  const todoBtn = document.createElement("button");
  todoBtn.innerHTML = `<i class="${iconClasses}"></i>`;
  todoBtn.classList.add(`${self}`);

  return todoBtn;
}

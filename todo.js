// todo.js

const todoInput = document.getElementById("todoInput");
const addTodoButton = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

let todos = [];

// 로컬 스토리지에서 todos 불러오기
function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
}

// 로컬 스토리지에 todos 저장하기
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 할 일 목록 렌더링
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    listItem.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button class="btn btn-warning btn-sm edit-button" data-index="${index}">수정</button>
        <button class="btn btn-danger btn-sm delete-button" data-index="${index}">삭제</button>
      </div>
    `;
    todoList.appendChild(listItem);
  });

  // 이벤트 리스너 추가
  addEventListeners();
}

// 할 일 추가
function addTodo() {
  const newTodoText = todoInput.value.trim();
  if (newTodoText !== "") {
    todos.push({ text: newTodoText });
    todoInput.value = "";
    saveTodos();
    renderTodos();
  }
}

// 할 일 삭제
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// 할 일 수정
function editTodo(index) {
  const newText = prompt("수정할 내용을 입력하세요:", todos[index].text);
  if (newText !== null) {
    todos[index].text = newText;
    saveTodos();
    renderTodos();
  }
}

// 이벤트 리스너 추가
function addEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  const editButtons = document.querySelectorAll(".edit-button");

  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      deleteTodo(index);
    });
  });

  editButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      editTodo(index);
    });
  });
}

// 초기 로딩
loadTodos();
renderTodos();

addTodoButton.addEventListener("click", addTodo);
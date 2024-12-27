const addButton = document.getElementById("addTodo");
const todoListElement = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");

function addTodo(text, checked = false) {
    // li 요소 만들기
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "justify-content-between"
    );
      // 텍스트 추가
  const spanElement = document.createElement("span");
  spanElement.classList.add("ms-2", "flex-grow-1");
  spanElement.textContent = text;
  li.append(spanElement);

  todoListElement.append(li);
}

  // 새로운 할일 추가 버튼 클릭 이벤트
  addButton.addEventListener("click", () => {
    if (todoInput.value.trim() === "") return; // 빈 입력 방지

    // 새로운 할일 추가
    addTodo(todoInput.value);

    // // localStorage 업데이트
    // const todos = loadTodos();
    // const todoData = {
    //   text: todoInput.value,
    //   checked: false,
    // };
    // todos.push(todoData);
    // saveTodos(todos);

    // 입력창 비우기
    todoInput.value = "";
  });
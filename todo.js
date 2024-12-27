const addButton = document.getElementById("addTodo");
const todoListElement = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const filterMenu = document.getElementById("filterMenu");

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

// localStorage에서 할일 목록 가져오기
function loadTodos() {
    const savedTodos = localStorage.getItem("todoList");
    return savedTodos ? JSON.parse(savedTodos) : [];
}
// localStorage에 할일 목록 저장하기
function saveTodos(todos) {
    localStorage.setItem("todoList", JSON.stringify(todos));
    renderTodos();
}

// 검색 기능
function filterTodos(filterType) {
    let filteredTodos = [];
  
    const todos = loadTodos();
    switch (filterType) {
      case "completed":
        filteredTodos = todos.filter(todo => todo.checked);
        console.log("completed");
        break;
      case "doing":
        filteredTodos = todos.filter(todo => !todo.checked);
        console.log("doing");

        break;
      case "all":
        console.log("all");

      default:
        filteredTodos = loadTodos();
    }
  
    console.log("filterTodos", filteredTodos);
    renderTodos(filteredTodos);
  }


// 할일을 렌더링하는 함수
function renderTodos(todosToRender = loadTodos()) {
    todoListElement.innerHTML = ""; // 기존 목록 비우기

    todosToRender.forEach((todo) => {
        addTodo(todo.text, todo.checked); // 필터링된 항목들을 화면에 추가
    });
}

// 초기화 함수
function initialize() {
    renderTodos();

    // 새로운 할일 추가 버튼 클릭 이벤트
    addButton.addEventListener("click", () => {
        if (todoInput.value.trim() === "") return; // 빈 입력 방지

        // 새로운 할일 추가
        addTodo(todoInput.value);

        // localStorage 업데이트
        const todos = loadTodos();
        const todoData = {
            text: todoInput.value,
            checked: false,
        };
        todos.push(todoData);
        saveTodos(todos);

        // 입력창 비우기
        todoInput.value = "";
    });

    filterMenu.addEventListener("click", (e) => {
        console.log("data filtered")
        const filterType = e.target.getAttribute("data-filter");
        console.log("Filter Type:", filterType); // filterType 출력

        if (filterType) {

          filterTodos(filterType);
          console.log("test")
        }
        else {
            console.log("not filterType");
        }
      });
}

// 페이지 로드시 초기화
document.addEventListener("DOMContentLoaded", initialize);
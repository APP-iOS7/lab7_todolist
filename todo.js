// DOM 요소들을 미리 저장
const todoListElement = document.getElementById("todoList");
const addButton = document.getElementById("addTodo");
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

    // 체크박스 만들기
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input");
    // checkbox 요소 checked 프로퍼티에 checked 파라미터의 값 (true/false) 할당
    checkbox.checked = checked;

    // 텍스트 추가
    const spanElement = document.createElement("span");
    spanElement.classList.add("ms-2", "flex-grow-1");
    spanElement.textContent = text;

    // 체크박스 상태에 따라 취소선 처리
    spanElement.style.textDecoration = checked ? "line-through" : "none";

    // 체크박스 클릭시 처리
    // 체크박스의 값이 변경되면, 여기서 정의한 함수가 실행됨 (지연 실행)
    checkbox.addEventListener("change", () => {
        spanElement.style.textDecoration = checkbox.checked ? "line-through" : "none";

        // localStorage 업데이트
        const todos = loadTodos();
        const index = Array.from(li.parentElement.children).indexOf(li);
        todos[index].checked = checkbox.checked;
        saveTodos(todos);
    });

    // 삭제 버튼 추가
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
        // localStorage 업데이트
        const todos = loadTodos();
        const index = Array.from(li.parentElement.children).indexOf(li);
        todos.splice(index, 1);
        saveTodos(todos);
        // 요소 삭제
        li.remove();
    });

    // 수정 버튼 추가
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-warning", "btn-sm", "ms-2");
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => {
        const newTodoText = prompt("수정할 내용을 입력하세요:", spanElement.textContent);

        if (newTodoText !== null && newTodoText.trim() !== "") {
            spanElement.textContent = newTodoText.trim();

            // localStorage 업데이트
            const todos = loadTodos();
            const index = Array.from(li.parentElement.children).indexOf(li);
            todos[index].text = newTodoText.trim();
            saveTodos(todos);
        }

        if (newTodoText == "") {
            alert("텍스트를 입력하지 않았습니다!");
        }
        else {
            todos.push({ text: newTodoText });
            todoInput.value = "";
            saveTodos();
            renderTodos();
        }



    });


    li.prepend(checkbox);
    li.append(spanElement);
    li.append(editButton);

    li.append(deleteButton);
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
    // 저장된 할일 목록

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


// 수정, 삭제, 완료 처리 기능
todoList.addEventListener("click", (e) => {
    const target = e.target;

    // 삭제 버튼 처리
    if (target.classList.contains("delete-todo")) {
        const listItem = target.closest("li");
        listItem.remove();
    }
    // 수정 버튼 처리
    else if (target.classList.contains("edit-todo")) {
        const listItem = target.closest("li");
        const todoTextElement = listItem.querySelector(".todo-text");
        const newTodoText = prompt("수정할 내용을 입력하세요:", todoTextElement.textContent);

        if (newTodoText !== null && newTodoText.trim() !== "") {
            todoTextElement.textContent = newTodoText.trim();
        }
    }
    // 체크박스 처리 (완료 처리)
    else if (target.classList.contains("complete-checkbox")) {
        const listItem = target.closest("li");
        const todoTextElement = listItem.querySelector(".todo-text");

        // 체크박스 상태에 따라 완료 여부 처리
        if (target.checked) {
            // 체크되면 완료 처리: 줄 긋기 추가
            todoTextElement.classList.add("completed");
        } else {
            // 체크 해제되면 완료 해제: 줄 긋기 제거
            todoTextElement.classList.remove("completed");
        }
    }
});
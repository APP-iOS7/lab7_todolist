// DOM 요소 선택
const todoInput = document.getElementById("todoInput");
const addTodoButton = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

// 할 일 추가
addTodoButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim(); // 입력값 가져오기

    if (todoText === "") {
        alert("할 일을 입력하세요!");
        return;
    }

    // 새로운 리스트 아이템 생성
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerHTML = `
    <div class="d-flex align-items-center">
    <input type="checkbox" class="form-check-input complete-checkbox" />
    <span class="todo-text">${todoText}</span>
    </div>
    <div>
    <button class="btn btn-sm btn-warning edit-todo">수정</button>
    <button class="btn btn-sm btn-danger delete-todo">삭제</button>
    </div>
    `;

    // 리스트에 추가
    todoList.appendChild(listItem);

    // 입력 필드 초기화
    todoInput.value = "";
});

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

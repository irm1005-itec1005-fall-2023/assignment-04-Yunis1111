document.addEventListener('DOMContentLoaded', loadTodos);
document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('clear-btn').addEventListener('click', clearTodos);

function addTodo() {
    let todoInput = document.getElementById('todo-input');
    let newTodo = todoInput.value.trim();

    if (newTodo) {
        let listItem = document.createElement('li');
        listItem.textContent = newTodo;

        let completedBtn = createCompletedButton();
        listItem.appendChild(completedBtn);

        let deleteBtn = createDeleteButton();
        listItem.appendChild(deleteBtn);

        document.getElementById('todo-list').appendChild(listItem);
        todoInput.value = '';
        saveTodos();
    }
}

function createCompletedButton() {
    let completedBtn = document.createElement('button');
    completedBtn.textContent = 'Mark as Completed';
    completedBtn.className = 'completed-btn';
    completedBtn.addEventListener('click', function(event) {
        event.target.parentElement.classList.toggle('completed');
        saveTodos();
    });
    return completedBtn;
}

function createDeleteButton() {
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function(event) {
        event.target.parentElement.remove();
        saveTodos();
    });
    return deleteBtn;
}

function clearTodos() {
    document.getElementById('todo-list').innerHTML = '';
    saveTodos();
}

function loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        let listItem = document.createElement('li');
        listItem.textContent = todo.text;

        let completedBtn = createCompletedButton();
        listItem.appendChild(completedBtn);

        let deleteBtn = createDeleteButton();
        listItem.appendChild(deleteBtn);

        if (todo.completed) {
            listItem.classList.add('completed');
        }

        document.getElementById('todo-list').appendChild(listItem);
    });
}

function saveTodos() {
    let todos = [];
    document.querySelectorAll('#todo-list li').forEach(item => {
        let todoText = item.firstChild.textContent;
        let isCompleted = item.classList.contains('completed');
        todos.push({ text: todoText, completed: isCompleted });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

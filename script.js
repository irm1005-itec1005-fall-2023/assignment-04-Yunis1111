document.addEventListener('DOMContentLoaded', loadTodos);
document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('clear-btn').addEventListener('click', clearTodos);

function addTodo() {
    let todoInput = document.getElementById('todo-input');
    let newTodo = todoInput.value.trim();

    if (newTodo) {
        let listItem = document.createElement('li');
        listItem.textContent = newTodo;
        
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            listItem.remove();
            saveTodos();
        };

        listItem.appendChild(deleteBtn);

        listItem.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            saveTodos();
        });

        document.getElementById('todo-list').appendChild(listItem);
        todoInput.value = '';
        saveTodos();
    }
}

function clearTodos() {
    let todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    saveTodos();
}

function loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    for (let todo of todos) {
        let listItem = document.createElement('li');
        listItem.textContent = todo.text;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            listItem.remove();
            saveTodos();
        };

        listItem.appendChild(deleteBtn);

        if (todo.completed) {
            listItem.classList.add('completed');
        }

        listItem.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            saveTodos();
        });

        document.getElementById('todo-list').appendChild(listItem);
    }
}

function saveTodos() {
    let todos = [];
    document.querySelectorAll('#todo-list li').forEach(item => {
        todos.push({
            text: item.firstChild.textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

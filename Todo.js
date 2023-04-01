const todoInput = document.querySelector('.todo-input')
const addTodoBtn = document.querySelector('.add-todo');
const todoList = document.querySelector('.todos_container');
const filterList = document.querySelector('.filter_todos');
const darkModeBtn = document.querySelector('#dark_mode')

addTodoBtn.addEventListener('click', addTodo);
filterList.addEventListener('click', filterTodos);
todoList.addEventListener('click', removeCheck);
document.addEventListener('DOMContentLoaded', getLocal);
darkModeBtn.addEventListener('click', changeTheme);

function addTodo(e) {
    e.preventDefault();
    if (todoInput.value === '') return false;
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todos');
    const newTodo = `
                   <li>${todoInput.value}<span>
                   <i class="fa-solid fa-square-check"></i>
                   <i class="fa-solid fa-trash-can"></i>
                   </span></li>`
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    savedLocal(todoInput.value)
    todoInput.value = '';
}

function removeCheck(e) {
    const classList = [...e.target.classList];
    const item = e.target;
    if (classList[1] === 'fa-trash-can') {
        const todo = item.parentElement.parentElement.parentElement;
        removeLocal(todo);
        todo.remove();
    } else if (classList[1] === 'fa-square-check') {
        const todo = item.parentElement.parentElement.parentElement;
        todo.classList.toggle('completed');
        // console.log(item.parentElement.parentElement);
    }
}

function filterTodos(e) {
    // console.log(e.target.value);
    const todos = [...todoList.childNodes]
    console.log(todos);
    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                console.log(todo.classList.contains('completed'));
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function savedLocal(todo) {
    const savedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem('todos'))
        : [];
    savedTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(savedTodos))
}

function getLocal() {
    const savedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem('todos'))
        : [];

    savedTodos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todos');
        const newTodo = `
                       <li>${todo}<span>
                       <i class="fa-solid fa-square-check"></i>
                       <i class="fa-solid fa-trash-can"></i>
                       </span></li>`
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    })
}

function removeLocal(todo) {

    const savedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem('todos'))
        : [];

    const filteredTodos = savedTodos.filter(t => {
        t !== todo.children[0].innerText
    });

    localStorage.setItem('todos', JSON.stringify(filteredTodos));
}

function changeTheme() {
    document.body.classList.toggle('dark_mode')
}
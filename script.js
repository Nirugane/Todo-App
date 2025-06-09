const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const filterAllButton = document.getElementById('filterAll');
const filterPendingButton = document.getElementById('filterPending');
const filterCompletedButton = document.getElementById('filterCompleted');

let tasks = [];
let currentFilter = 'all';

function generateUniqueId() {
    return Date.now() + Math.random();
}

function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'pending') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? '↩️' : '✔️'}</button>
                <button class="delete-btn">🗑️</button>
            </div>
        `;

        const completeButton = li.querySelector('.complete-btn');
        const deleteButton = li.querySelector('.delete-btn');

        completeButton.addEventListener('click', () => toggleTaskCompletion(task.id));
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Por favor, ingresa una tarea.');
        return;
    }

    const newTask = {
        id: generateUniqueId(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
}

function toggleTaskCompletion(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;
    updateFilterButtons();
    renderTasks();
}

function updateFilterButtons() {
    filterAllButton.classList.remove('active');
    filterPendingButton.classList.remove('active');
    filterCompletedButton.classList.remove('active');

    if (currentFilter === 'all') {
        filterAllButton.classList.add('active');
    } else if (currentFilter === 'pending') {
        filterPendingButton.classList.add('active');
    } else if (currentFilter === 'completed') {
        filterCompletedButton.classList.add('active');
    }
}

// Event Listeners
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

filterAllButton.addEventListener('click', () => setFilter('all'));
filterPendingButton.addEventListener('click', () => setFilter('pending'));
filterCompletedButton.addEventListener('click', () => setFilter('completed'));

// Initial render
updateFilterButtons();
renderTasks();
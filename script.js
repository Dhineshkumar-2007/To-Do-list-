// Get references to DOM elements
const inputText = document.getElementById('input-text');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.checked);
    });
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(item => {
        const task = {
            text: item.textContent.replace('X', '').trim(),
            checked: item.querySelector('input').checked
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a task element
function createTaskElement(text, isChecked) {
    // Create a new list item (task)
    const li = document.createElement('li');
    li.classList.add('task');

    // Create checkbox for the task
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('checkedbox');
    checkBox.checked = isChecked;
    
    // Create delete (X) button for removing the task
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = 'X';

    // Append checkbox, task text, and delete button to the list item
    li.appendChild(checkBox);
    li.appendChild(document.createTextNode(text));
    li.appendChild(deleteButton);

    // Add the task to the list
    taskList.appendChild(li);

    // Event listener for checkbox to toggle strikethrough
    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            li.classList.add('strikethrough');
        } else {
            li.classList.remove('strikethrough');
        }
        saveTasks(); // Save updated tasks after change
    });

    // Event listener for delete button to remove task
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks(); // Save updated tasks after deletion
    });
}

// Function to add a new task
function addTask() {
    const taskText = inputText.value.trim();

    if (taskText === '') {
        alert('You must enter a task!');
        return;
    }

    // Create a new task element and add it to the list
    createTaskElement(taskText, false);

    // Clear the input field
    inputText.value = '';

    // Save tasks to local storage
    saveTasks();
}

// Event listener for the Add button to add task
addButton.addEventListener('click', addTask);

// Optional: Allow pressing 'Enter' to add a task
inputText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load tasks from local storage when the page loads
window.addEventListener('DOMContentLoaded', loadTasks);

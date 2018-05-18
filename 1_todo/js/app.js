// Define UI variables

const 	form = document.querySelector('#task-form'),
		taskList = document.querySelector('.collection'),
		clearBtn = document.querySelector('.clear-tasks'),
		filter = document.querySelector('#filter'),
		taskInput = document.querySelector('#task');



// Load all event listeners

loadEventListeners();

function loadEventListeners() {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear tasks event
	clearBtn.addEventListener('click', clearTasks);
	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
}



// FUNCTIONS

// Get tasks from localStorage

function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));	
	}

	tasks.forEach(function(task) {
		// Creating li element
		const li = document.createElement('li');

		// Adding class
		li.classList.add('collection-item');

		// Creating text node and appending it to li
		li.appendChild(document.createTextNode(task));

		// Creating new link element
		const link = document.createElement('a');

		// Add class
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fa fa-remove">x</i>';

		// Append the link to the li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	});
}





// Add task

function addTask(e) {
	if(taskInput.value === '') {
		alert('Add a task');
	}

	// Creating li element
	const li = document.createElement('li');

	// Adding class
	li.classList.add('collection-item');

	// Creating text node and appending it to li
	li.appendChild(document.createTextNode(taskInput.value));

	// Creating new link element
	const link = document.createElement('a');

	// Add class
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="fa fa-remove">x</i>';

	// Append the link to the li
	li.appendChild(link);

	// Append li to ul
	taskList.appendChild(li);


	// Store in localStorage
	storeTaskInLocalStorage(taskInput.value);


	// Clear input
	taskInput.value = '';

	e.preventDefault();
}





// Store task in localStorage

function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));	
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}




// Remove task from localStorage

function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));	
	}

	tasks.forEach(function(task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}





// Remove task

function removeTask(e) {
	if(e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();

			// Remove from LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}




// Clear tasks

function clearTasks() {
	// The first way
	// taskList.innerHTML = '';

	// ... or the second way (faster)
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear from LS
	clearTasksFromLocalStorage();
}




// Clear tasks from localStorage

function clearTasksFromLocalStorage() {
	localStorage.clear();
}




// Filter Tasks (search)

function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	console.log(e.target.value.toLowerCase());
	document.querySelectorAll('.collection-item').forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}
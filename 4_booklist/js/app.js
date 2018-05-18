// Book Constructor

function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}


// UI Constructor

function UI() {}


// Add book to list

UI.prototype.addBookToList = function(book) {
	console.log(book);
	const list = document.getElementById('book-list');

	// Creating a tr element
	const row = document.createElement('tr');
	// Insert cols
	row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">x</a></td>
	`;
	list.appendChild(row);
}


// Delete book

UI.prototype.deleteBook = function(target) {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
}


// Clear fields

UI.prototype.clearFields = function() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
}


// Show alert

UI.prototype.showAlert = function(message, className) {
	// Create div
	const div = document.createElement('div');
	// Add classes
	div.className = `alert ${className}`;
	// Add text
	div.appendChild(document.createTextNode(message));
	// Get parent
	const container = document.querySelector('.container'),
			form = document.querySelector('#book-form');
	container.insertBefore(div, form);

	// Timeout after 2 sec
	setTimeout(function() {
		div.remove();
	}, 2000);
}


// Event listener for add book

document.getElementById('book-form').addEventListener('submit', function(e) {
	// Get form values
	const 	title = document.getElementById('title').value,
			author = document.getElementById('author').value,
			isbn = document.getElementById('isbn').value;
	console.log(title, author, isbn);

	// Instantiate book
	const book = new Book(title, author, isbn);
	console.log(book);

	// Instantiate UI
	const ui = new UI();

	// Validate
	if (title.value === '' || author.value === '' || isbn === '') {
		// Error message
		ui.showAlert('Please fill in all the fields', 'error');
	} else {
		// Add book to list
		ui.addBookToList(book);

		// Clear fields
		ui.clearFields();

		// Show success
		ui.showAlert('Book added!', 'success');
		
	}

	e.preventDefault();
});


// Event listener for delete

document.getElementById('book-list').addEventListener('click', function(e) {
	// Instantiate UI
	const ui = new UI();
	// Delete the book
	ui.deleteBook(e.target);
	// Show alert
	ui.showAlert('Book removed!', 'success');

	e.preventDefault();
});
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}



class UI {
	addBookToList(book) {
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

	deleteBook(target) {
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}

	clearFields() {
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';

	}

	showAlert(message, className) {
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
}




// Local Storage class

class Store {
	static getBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	static displayBooks() {
		const books = Store.getBooks();
		books.forEach(function(book) {
			const ui = new UI();
			// Add book to UI
			ui.addBookToList(book);
		});
	}

	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(isbn) {
		const books = Store.getBooks();

		books.forEach(function(book, index) {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});		
		localStorage.setItem('books', JSON.stringify(books));
	}
}




// DOM Load event

document.addEventListener('DOMContentLoaded', Store.displayBooks);





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

		// Add to LS
		Store.addBook(book);

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
	// Remove from LS
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	// Show alert
	ui.showAlert('Book removed!', 'success');

	e.preventDefault();
});
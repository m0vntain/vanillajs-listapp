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

    // create tr element
    const row = document.createElement('tr');
    
    // insert columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row); 
    }

    showAlert(message, className) {
       // create div
        const div = document.createElement('div');

        // add classes
        div.className = `alert ${className}`;

        // add text
        div.appendChild(document.createTextNode(message));

        // get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        
        // insert alert
        container.insertBefore(div, form);

        // timeout after 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
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
}


// event listeners for add book
document.getElementById('book-form').addEventListener('submit', (e) => {
    // get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // instantiate book object
    const book1 = new Book(title, author, isbn);

    // instantiate UI object
    const ui = new UI();

    console.log(ui);

    // validate
    if (title === '' || author === '' || isbn === '') {
        // error alert
        ui.showAlert('Please fill in all fields.', 'error');
    } else {
        // add book to list
        ui.addBookToList(book1);
        ui.showAlert('Book added successfully!', 'success');


        // clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// event listener for delete book
document.getElementById('book-list').addEventListener('click', (e) => {

    const ui = new UI();

    ui.deleteBook(e.target);

    //show message
    ui.showAlert('Book removed!', 'success');

    e.preventDefault();
});
const library = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeReadStatus = function() {
    this.read = !this.read;
}


function addBookToLibrary(author, title, pages, read) {
    const newBook = new Book(author, title, pages, read);
    library.push(newBook);
}

// Create some books
const book1 = new Book('J.K. Rowling', 'Harry Potter and the Philosopher\'s Stone', 223, true);
const book2 = new Book('J.R.R. Tolkien', 'The Hobbit', 310, false);
library.push(book1, book2);


const displayLibrary = () => {
    const libraryDOM = document.getElementsByClassName('library')[0];
    libraryDOM.innerHTML = '';
    library.forEach((book, index) => {
        libraryDOM.innerHTML += `
            <div class="book">
                <h2>Title: ${book.title}</h2>
                <h3>Author: ${book.author}</h3>
                <p>Pages: ${book.pages} pages</p>
                <p>${book.read ? 'Read' : 'Not read'}</p>
                <div class="flex gap-10">
                <button onclick="library[${index}].changeReadStatus(); displayLibrary();">Change read status</button>
                <button onclick="library.splice(${index}, 1); displayLibrary();">Remove book</button>
                </div>
            </div>
        `;
    });
}

displayLibrary();


const handleAddNewButtonClick = () => {
    //create a form to add a new book as a dialog
    const formHtml = `
        <form id="newBookForm">
            <div>
            <label for="author">Author:</label>
            <input type="text" id="author" name="author" required>
            </div>
            <div>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required>
            </div>
            <div>
            <label for="pages">Pages:</label>
            <input type="number" id="pages" name="pages" required>
            </div>
            <div>
            <label for="read">Read:</label>
            <input type="checkbox" id="read" name="read">
            <div>
            <button type="submit">Add Book</button>
        </form>
    `;

    const dialog = document.createElement('dialog');
    dialog.setAttribute('class', 'dialog');
    dialog.innerHTML = formHtml;
    
    document.body.appendChild(dialog);
    dialog.showModal();
    handleAddNewBookFormSubmit(dialog);
}

/** 
 * @param {HTMLDialogElement} dialog
*/
const handleAddNewBookFormSubmit = (dialog) => {
    document.getElementById('newBookForm').addEventListener('submit', (event) => {
        event.preventDefault();
        // use event to get the values of the form
        const author = event.target.author.value;
        const title = event.target.title.value;
        const pages = event.target.pages.value;
        const read = event.target.read.checked;
        addBookToLibrary(author, title, pages, read);
        dialog.close();
        displayLibrary();
    });
}
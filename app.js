/* eslint-disable class-methods-use-this */
/* eslint-disable no-alert */
/* eslint-disable max-classes-per-file */
class Book {
  constructor(author, title) {
    this.id = new Date().valueOf();
    this.author = author;
    this.title = title;
  }
}
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

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    let books = Store.getBooks();
    const updatedBooks = books.filter((book) => book.id !== parseInt(id, 10));
    books = updatedBooks;
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {
  static displayBook() {
    const bookList = Store.getBooks();
    bookList.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const lsOutput = document.getElementById('lsOutput');
    lsOutput.innerHTML += `
    <div class="Box-row d-flex flex-items-center" id="${book.id}">
      <div class="flex-auto">
        <strong>${book.title}</strong>
        <div class="text-small text-gray-light">
        ${book.author}
        </div>
      </div>
      <button type="button" class="btn btn-primary delete" name="button">Delete</button>
    </div>
    `;
  }

  static deleteBook(id) {
    const el = document.getElementById(`${id}`);
    el.parentNode.removeChild(el);
  }
}

class Screen {
  constructor() {
    this.app = document.querySelector('#app');
    this.app.classList.add('Layout');

    this.header = document.createElement('div');
    this.header.classList.add('Header');
    this.header.innerHTML = `
    <div class="Header-item">
      <a href="/" class="Header-link f4 d-flex flex-items-center">
        <span>Awesome Books</span>
      </a>
    </div>
    `;

    this.bookList = document.createElement('div');
    this.bookList.classList.add('Box');
    this.bookList.id = 'lsOutput';
    this.bookList.innerHTML = `
    <div class="Box-header d-flex flex-items-center">
      <h3 class="Box-title overflow-hidden flex-auto">
        Book List
      </h3>
    </div>
    `;

    this.app.append(this.header, this.bookList);
  }

  render() {
    UI.displayBook();
  }
}

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.inpAuthor.value === '' || e.target.inpTitle.value === '') {
    alert('Fields not supposed to be empty!');
  } else {
    const author = e.target.inpAuthor.value.trim();
    const title = e.target.inpTitle.value.trim();

    const newBook = new Book(author, title);
    Store.addBook(newBook);
    UI.addBookToList(newBook);
    e.target.reset();
  }
});

const app = new Screen();
app.render();

document.querySelector('#lsOutput').addEventListener('click', (e) => {
  UI.deleteBook(e.target.parentElement.id);
  Store.removeBook(e.target.parentElement.id);
});
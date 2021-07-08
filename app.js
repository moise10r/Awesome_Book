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
      <span class="h3">${book.title}</span>
        <div class="text-small text-gray-light">
        <span class="f6">Author :</span>  <span class="h5">${book.author}</span>
        </div>
      </div>
      <button type="button" class="btn btn-danger delete" name="button">Delete</button>
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
      <a class="Header-link f4 d-flex flex-items-center" data-target="#list">
        <span>Awesome Books</span>
      </a>
    </div>
      <div class="Header-item Header-item--full"></div>
      <div class="Header-item mr-0">
        <a class="Header-link mr-3" data-target="#list">Book List</a>
      </div>
    <div class="Header-item mr-0">
      <a class="Header-link mr-3" data-target="#newBook">Add new</a>
    </div>
    <div class="Header-item mr-0">
      <a class="Header-link mr-3" data-target="#contact">Contact</a>
    </div>
    `;
    this.footer = document.createElement('footer');
    this.footer.classList.add(
      'Header',
      'd-flex',
      'flex-justify-center',
      'footer',
    );
    this.footer.innerHTML = `
    <div class="Header-item">
      <a href="#" class="Header-link">copyright @Awesome Book</a>
    </div>`;
    this.layoutMain = document.createElement('main');
    this.layoutMain.classList.add('Layout-main', 'p-4');

    this.bookList = document.createElement('div');
    this.bookList.classList.add('Box', 'mb-4');
    this.bookList.id = 'lsOutput';
    this.bookList.innerHTML = `
    <div class="Box-header d-flex flex-items-center">
      <h3 class="Box-title overflow-hidden flex-auto">
        Book List
      </h3>
    </div>
    `;
    this.newBookForm = document.createElement('div');
    this.newBookForm.classList.add('Box');
    this.newBookForm.innerHTML = `<div class="Box-header">
    Add New Book
    </div>
    <div class="Box-body">
      <form>
        <input class="form-control" type="text" id="inpAuthor" placeholder="Enter author name" />
        <input class="form-control" type="text" id="inpTitle"  placeholder="Enter Book tilte" />
        <button class="btn btn-primary"  type="submit">Add Book</button>
      </form>
    </div>
    `;

    this.app.append(this.header, this.layoutMain, this.footer);
    this.layoutMain.append(this.bookList, this.newBookForm);
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
  const isButton = e.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  Store.removeBook(e.target.parentElement.id);
  UI.deleteBook(e.target.parentElement.id);
});

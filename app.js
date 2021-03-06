/* eslint-disable class-methods-use-this */
/* eslint-disable no-alert */
/* eslint-disable max-classes-per-file */

const date = window.luxon;

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
    const lsOutput = document.querySelector('.lsOutput');
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

class Nav {
  constructor() {
    this.tabs = document.querySelectorAll('[data-target]');
  }

  init() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          this.toggleTabs(e);
          this.toggleContent(e);
        }
      });
    });
  }

  toggleTabs(e) {
    this.tabs.forEach((tab) => tab.classList.remove('active'));
    e.target.classList.add('active');
  }

  toggleContent(e) {
    document.querySelectorAll('.ContentBox').forEach((item) => {
      item.classList.remove('active');
    });
    const selector = e.target.getAttribute('data-target');
    const content = document.querySelector(selector);
    content.classList.add('active');
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
      <a class="Header-link f4 d-flex flex-items-center active" data-target="#list">
        <span>Awesome Books</span>
      </a>
    </div>
      <div class="Header-item Header-item--full"></div>
      <div class="Header-item mr-0">
        <a class="Header-link mr-3 active" data-target="#list">Book List</a>
      </div>
    <div class="Header-item mr-0">
      <a class="Header-link mr-3" data-target="#newBook">Add new</a>
    </div>
    <div class="Header-item mr-0">
      <a class="Header-link mr-3" data-target="#contact">Contact</a>
    </div>
    `;
    const now = date.DateTime.local();
    this.clock = document.createElement('div');
    this.clock.classList.add('clock');
    this.clock.innerHTML = `
    ${now.toFormat('ffff')}
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
      <a href="#" class="Header-link">Awesome Book List</a>
    </div>`;
    this.layoutMain = document.createElement('main');
    this.layoutMain.classList.add('Layout-main', 'p-4');

    this.bookList = document.createElement('div');
    this.bookList.classList.add(
      'Box',
      'ContentBox',
      'mb-4',
      'content',
      'lsOutput',
      'active',
    );
    this.bookList.id = 'list';
    this.bookList.innerHTML = `
    <div class="Box-header d-flex flex-items-center">
      <h3 class="Box-title overflow-hidden flex-auto">
        Book List
      </h3>
    </div>
    `;
    this.newBookForm = document.createElement('div');
    this.newBookForm.classList.add('ContentBox', 'content');
    this.newBookForm.id = 'newBook';
    this.newBookForm.innerHTML = `<div>
    <h2 class="text-center m-3">Add New Book</h2>
    </div>
    <div class=" d-flex  flex-justify-center">
      <form class="d-flex  flex-column flex-justify-center form">
        <input class="form-control" type="text" id="inpAuthor" placeholder="Enter author name" />
        <input class="form-control" type="text" id="inpTitle"  placeholder="Enter Book tilte" />
        <button class="btn btn-primary"  type="submit">Add Book</button>
      </form>
    </div>
    `;

    this.contact = document.createElement('div');
    this.contact.classList.add('ContentBox', 'content');
    this.contact.id = 'contact';
    this.contact.innerHTML = `
    <div class="Box-body d-flex flex-column flex-items-center">
      <h2>Contact Informarion</h2>
      <p>Do you have any question or you just want to say 'Hello!'<p/>
      <p>You can reach out to us!</p>
      <ul class="mb-9">
        <li>Our email: mail@gmail.com</li>
        <li>Our Phone number: 0043729136280 </li>
        <li>Our address: streetname 22,84503 city, country</li>
      </ul>
    </div>
    `;

    this.app.append(this.header, this.clock, this.layoutMain, this.footer);
    this.layoutMain.append(this.bookList, this.newBookForm, this.contact);
  }

  render() {
    UI.displayBook();
    const nav = new Nav();
    nav.init();
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
    document.querySelectorAll('.content').forEach((item) => {
      item.classList.remove('active');
    });
    const content = document.querySelector('#list');
    content.classList.add('active');
  }
});

const app = new Screen();
app.render();

document.querySelector('.lsOutput').addEventListener('click', (e) => {
  const isButton = e.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  Store.removeBook(e.target.parentElement.id);
  UI.deleteBook(e.target.parentElement.id);
});

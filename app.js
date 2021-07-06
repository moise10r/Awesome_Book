/* eslint-disable no-alert */
/* eslint-disable max-classes-per-file */
// const inpAuthor = document.getElementById("inpAuthor");
// const inpTitle = document.getElementById("inpTitle");

// const btnInsert = document.getElementById("btnInsert");
const lsOutput = document.getElementById('lsOutput');

// const bookList = JSON.parse(localStorage.getItem("Books")) || [];

// btnInsert.onclick = () => {
//   const author = inpAuthor.value;
//   const title = inpTitle.value;

//   if (author && title) {
//     const newBook = {
//       author,
//       title,
//     };
//     bookList.push(newBook);
//     localStorage.setItem("Books", JSON.stringify(bookList));
//     location.reload();
//   }
// };

// // eslint-disable-next-line no-unused-vars
// function removeBook(val) {
//   const book = bookList.filter((data, i) => i !== val);
//   localStorage.setItem("Books", JSON.stringify(book));
//   // eslint-disable-next-line no-restricted-globals
//   location.reload();
// }

// for (let i = 0; i < bookList.length; i += 1) {
//   const book = bookList[i];
//   lsOutput.innerHTML += `
//   <button id="delBtn" onclick="removeBook(${i})">Delete</button>
//   ${"  "}
//   ${book.author}:
//   ${book.title}
//   </br>
//   `;
// }

// Book class Author and title

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
    console.log(updatedBooks);
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
    lsOutput.innerHTML += `
    <div id="${book.id}">
      <button >Delete</button> 
      ${book.author}:
      ${book.title}
    </div>
    `;
  }

  static deleteBook(id) {
    const el = document.getElementById(`${id}`);
    el.parentNode.removeChild(el);
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

lsOutput.addEventListener('click', (e) => {
  UI.deleteBook(e.target.parentElement.id);
  Store.removeBook(e.target.parentElement.id);
});

UI.displayBook();

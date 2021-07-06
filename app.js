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
    this.author = author;
    this.title = title;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [new Book('J.R.Tolkin', 'L.O.T.R')];
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
    const books = Store.getBooks();
    books.splice(id, 1);
  }
}

class UI {
  static displayBook() {
    const bookList = Store.getBooks();
    bookList.forEach((book, i) => UI.addBookToList(book, i));
  }

  static addBookToList(book, i) {
    lsOutput.innerHTML += `
    <div id="${i}">
      <button >Delete</button> 
      ${book.author}:
      ${book.title}
    </div>
    `;
  }

  static deleteBook(id) {
    console.log(id);
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
    UI.addBookToList(newBook);
    e.target.reset();
  }
});

lsOutput.addEventListener('click', (e) => {
  console.log(e.target.parentElement);
  UI.deleteBook(parseInt(e.target.id, 10));
});

UI.displayBook();

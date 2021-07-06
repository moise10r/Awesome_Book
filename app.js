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

class UI {
  static displayBook() {
    const bookList = JSON.parse(localStorage.getItem('Books')) || [
      new Book('J.R.Tolkin', 'L.O.T.R'),
      new Book('J.R.Tolkin', 'L.O.T.R II'),
    ];
    bookList.forEach((book, i) => UI.addBookToList(book, i));
  }

  static addBookToList(book, i) {
    lsOutput.innerHTML += `
      <button id="${i}">Delete</button> 
      ${book.author}:
      ${book.title}
      </br>
    `;
  }

  static deleteBook(id) {
    delete this.bookList[id];
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
  console.log(e.target.id);
  UI.deleteBook(toInteger(e.target.id));
})

UI.displayBook();
// Local storage to store the book
// Display a book
// Remove a book
// Add a book
// UI operations

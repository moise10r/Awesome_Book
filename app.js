/* eslint-disable no-restricted-globals */
const inpAuthor = document.getElementById('inpAuthor');
const inpTitle = document.getElementById('inpTitle');
const btnInsert = document.getElementById('btnInsert');
const lsOutput = document.getElementById('lsOutput');

const bookList = JSON.parse(localStorage.getItem('Books')) || [];

btnInsert.onclick = () => {
	const author = inpAuthor.value;
	const title = inpTitle.value;

	if (author && title) {
		const newBook = {
			author,
			title,
		};
		bookList.push(newBook);
		localStorage.setItem('Books', JSON.stringify(bookList));
		location.reload();
	}
};

// eslint-disable-next-line no-unused-vars
function removeBook(val) {
	const book = bookList.filter((data, i) => i !== val);
	localStorage.setItem('Books', JSON.stringify(book));
	// eslint-disable-next-line no-restricted-globals
	location.reload();
}

for (let i = 0; i < bookList.length; i += 1) {
	const book = bookList[i];
	lsOutput.innerHTML += `
  <button id="delBtn" onclick="removeBook(${i})">Delete</button>
  ${'  '}
  ${book.author}:
  ${book.title}
  </br>
  `;
}

// Book class Author and title
class Book {
	constructor(author, title) {
		this.author = author;
		this.title = title;
	}
}

class UI {
	static displayBook() {
		const bookList = JSON.parse(localStorage.getItem('Books')) || [];
		console.log(bookList);
	}
}

UI.displayBook();
// Local storage to store the book
// Display a book
// Remove a book
// Add a book
// UI operations

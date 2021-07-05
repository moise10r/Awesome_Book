const inpAuthor = document.getElementById('inpAuthor');
const inpTitle = document.getElementById('inpTitle');
const btnInsert = document.getElementById('btnInsert');
const lsOutput = document.getElementById('lsOutput');
const delBtn = document.getElementById('delBtn');

let bookList = JSON.parse(localStorage.getItem('Books')) || [];

btnInsert.onclick = function () {
	const author = inpAuthor.value;
	const title = inpTitle.value;

	if (author && title) {
		let newBook = { author: author, title: title };
		bookList.push(newBook);
		localStorage.setItem('Books', JSON.stringify(bookList));
		location.reload();
	}
};

function removeBook(val) {
	const book = bookList.filter((data, i) => i !== val);
	localStorage.setItem('Books', JSON.stringify(book));
	location.reload();
}

for (let i = 0; i < bookList.length; i++) {
	const book = bookList[i];
	lsOutput.innerHTML += `
  <button id="delBtn" onclick="removeBook(${i})">Delete</button>
  ${'  '}
  ${book.author}:
  ${book.title}
  </br>
  `;
}

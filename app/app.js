const inpAuthor = document.getElementById('inpAuthor');
const inpTitle = document.getElementById('inpTitle');
const btnInsert = document.getElementById('btnInsert');
const lsOutput = document.getElementById('lsOutput')

btnInsert.onclick = function () {
    const author = inpAuthor.value
    const title = inpTitle.value

    console.log(author, title);

    if (author && title) {
        localStorage.setItem(author, title)
        // location.reload()
    }

    for (let i = 0; i < localStorage.length; i++) {
        const author = localStorage.key(i);
        const title = localStorage.getItem(author)

        lsOutput.innerHTML += `${author}: ${title} </br>` ;
    }
}
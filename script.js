let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = Boolean(read)
}

Book.prototype.info = function() {
   return `"${capitalFirstWord(this.title)}" by ${capitalFirstWord(this.author)}, has ${this.pages} pages, and I ${this.read ? '' : 'have not '}read it.`
}

function capitalFirstWord(value){
    let words = value.split(' ')

    let newString = words.map( word =>{
        if (word.length === 0){
            return
        } else {
            return word[0].toUpperCase() + word.slice(1).toLowerCase()
        }
    })
    return newString.join(' ')
}



function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    
    myLibrary.push(newBook)

    let gridItem = document.querySelector('.book-grid-template').cloneNode(true)
    gridItem.classList.remove('book-grid-template')
    gridItem.book = newBook

    gridItem.querySelector('.book-title').textContent = capitalFirstWord(title)
    gridItem.querySelector('.author').textContent = capitalFirstWord(author)
    gridItem.querySelector('.page-count').textContent = pages

    if (read === true) {
        gridItem.querySelector('.read').textContent = 'Yes'
    } else {
        let readSvg = gridItem.querySelector('#read-svg')
        gridItem.querySelector('.read').textContent = 'No'
        readSvg.style.display = 'block'
    }

    gridContainer.append(gridItem)

    let listItem = document.createElement('li')
    listItem.textContent = capitalFirstWord(title)
    listContainer.append(listItem)

    gridItem.addEventListener('click', (e) => {
        if (gridItem.book && !(e.target.closest('.book-buttons-container'))) {
            alert(gridItem.book.info())
        }
    })
}


function play(){
   for (let i = 0; i < myLibrary.length; i++){
    let innerArray = myLibrary[i]
    console.log(innerArray.title)
    console.log(innerArray.info())
   }
}

function closeAndReset() {
    formContainer.style.display = 'none'
    overlay.style.display = 'none'
    formTitle.value = ''
    formAuthor.value = ''
    formPages.value = ''
    formRead.checked = false
}



let newBookButton = document.getElementById('new-book-button')
let overlay = document.getElementById('overlay')
let formContainer = document.querySelector('.form-cc')
let formTitle = document.getElementById('title')
let formAuthor = document.getElementById('author')
let formPages = document.getElementById('count-pages')
let formRead = document.getElementById('read')
let submitButton = document.getElementById('form-button')
let gridContainer = document.querySelector('.grid-container')
let bookTitle = document.querySelector('book-title')
let listContainer = document.querySelector('.list')



gridContainer.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('#delete-svg'); // Find the closest delete button
    if (deleteButton) {
        // Delete button was clicked
        const gridItem = deleteButton.closest('.book-grid-container'); // Find the parent grid item
        if (gridItem) {

            // Remove the grid item from the gridContainer
            gridContainer.removeChild(gridItem);
            
            let bookTitle = gridItem.querySelector('.book-title').textContent
            let listItems = document.querySelectorAll('.list li')
            
            listItems.forEach(element => {
                if (element.textContent === bookTitle) {
                    element.remove()
                }
            });
        }
    }

    const readButton = e.target.closest('#read-svg'); // Find the closest read button
    if (readButton) {
        const gridItem = readButton.closest('.book-grid-container'); // Find the parent grid item
        if (gridItem) {
            gridItem.book.read = true
            gridItem.querySelector('.read').textContent = 'Yes'
            readButton.style.display = 'none'
        }
    }
});






// books.forEach((book) => {
//     let deleteSvg = book.querySelector('#delete-svg')
//     deleteSvg.addEventListener('click', () => {
//         console.log('hi s')
//         gridContainer.removeChild(book)
//     })
// });


newBookButton.addEventListener('click', () =>{ 
    formContainer.style.display = 'flex'
    overlay.style.display = 'block'
})

overlay.addEventListener('click', (event) =>{
    if (event.target === overlay) {
       closeAndReset()
    }
})

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formRead.checked)
    closeAndReset()
})

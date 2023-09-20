let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = Boolean(read)
}

Book.prototype.info = function() {
   return `${this.title} by ${this.author}, has ${this.pages} pages, and I ${this.read ? 'have' : 'have not'} read it.`
}


function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)

    let gridItem = document.querySelector('.book-grid-template').cloneNode(true)

    gridItem.classList.remove('book-grid-template')

    gridItem.querySelector('.book-title').textContent = title
    gridItem.querySelector('.author').textContent = author
    gridItem.querySelector('.page-count').textContent = pages
    gridItem.querySelector('.read').textContent = read === true ? 'Yes': 'No'

    gridContainer.append(gridItem)

    let listItem = document.createElement('li')
    listItem.textContent = title

    listContainer.append(listItem)




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

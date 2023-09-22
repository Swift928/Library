let newBookButton = document.getElementById('new-book-button')
let overlay = document.getElementById('overlay')
let formContainer = document.querySelector('.form-cc')
let formTitle = document.getElementById('title')
let formAuthor = document.getElementById('author')
let formPages = document.getElementById('count-pages')
let formRead = document.getElementById('read')
let submitButton = document.getElementById('form-button')
let gridContainer = document.querySelector('.grid-container')


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


function addBookToLibrary(title, author, pages, read) {

    // Create a new instance of book, newBook
    let newBook = new Book(title, author, pages, read)
    
    myLibrary.push(newBook)

    // Clone the book container, remove display='none' class, add instance of newBook
    let gridItem = document.querySelector('.book-grid-template').cloneNode(true)
    gridItem.classList.remove('book-grid-template')
    gridItem.book = newBook

    // Select the elements within the gridItem that will be updated
    gridItem.querySelector('.book-title').textContent = capitalFirstWord(title)
    gridItem.querySelector('.author').textContent = capitalFirstWord(author)
    gridItem.querySelector('.page-count').textContent = pages


    // This will display or not display the 'read' svg depending on the users read selection
    if (read === true) {
        gridItem.querySelector('.read').textContent = 'Yes'
    } else {
        let readSvg = gridItem.querySelector('#read-svg')
        gridItem.querySelector('.read').textContent = 'No'
        readSvg.style.display = 'block'
    }

    // Append the gridItem to the gridContainer
    gridContainer.append(gridItem)

    // Add the title of the gridItem to the Titles list
    const listContainer = document.querySelector('.list')
    let listItem = document.createElement('li')
    listItem.textContent = capitalFirstWord(title)
    listContainer.append(listItem)

    // Invoke the info function when the gridItem is clicked
    gridItem.addEventListener('click', (e) => {
        if (gridItem.book && !(e.target.closest('.book-buttons-container'))) {
            alert(gridItem.book.info())
        }
    })
}


gridContainer.addEventListener('click', (e) => {

    // Find the closest delete button
    const deleteButton = e.target.closest('#delete-svg');
    
    // This will delete the grid item, when the trash icon is clicked
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

    // Find the closest read button
    const readButton = e.target.closest('#read-svg'); 

    // This will change the status of the book to read, when the read icon is clicked
    if (readButton) {
        // Find the parent grid item
        const gridItem = readButton.closest('.book-grid-container');
        if (gridItem) {
            // Set the read property to true, for purposes of the alert
            gridItem.book.read = true
            gridItem.querySelector('.read').textContent = 'Yes'
            // Remove the read button from the container
            readButton.style.display = 'none'
        }
    }
});


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


function closeAndReset() {
    formContainer.style.display = 'none'
    overlay.style.display = 'none'
    formTitle.value = ''
    formAuthor.value = ''
    formPages.value = ''
    formRead.checked = false
}


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

    const title = formTitle.value.trim();
    const author = formAuthor.value.trim();
    const pages = formPages.value.trim();

    if (!title || !author || !pages) {
        // Display an error message or take appropriate action
        alert('Please fill in all required fields.');
        return; // Stop execution if required fields are missing
    }

    e.preventDefault()
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formRead.checked)
    closeAndReset()
})


// Testing loops on the library 
// function play(){
//    for (let i = 0; i < myLibrary.length; i++){
//     let innerArray = myLibrary[i]
//     console.log(innerArray.title)
//     console.log(innerArray.info())
//    }
// }
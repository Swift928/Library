class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(read)
    }

    info () {
        return `"${this.title}" by ${capitalFirstWord(this.author)}, has ${this.pages} pages, and I ${this.read ? '' : 'have not '}read it.`
    }
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




class LibraryManager {
    constructor() {
        this.myLibrary = [];
        this.initializeUI();
        this.setupEventListeners();
        this.updateDisplay();
    }

    initializeUI() {
        // Initialize DOM element references here
        this.newBookButton = document.getElementById('new-book-button')
        this.overlay = document.getElementById('overlay')
        this.formContainer = document.querySelector('.form-cc')
        this.formTitle = document.getElementById('title')
        this.formAuthor = document.getElementById('author')
        this.formPages = document.getElementById('count-pages')
        this.formRead = document.getElementById('read')
        this.submitButton = document.getElementById('form-button')
        this.gridContainer = document.querySelector('.grid-container')
    }

    updateDisplay() {
        this.myLibrary.forEach(book => {

            // Clone the book container, remove display='none' class, add instance of newBook
            const gridItem = document.querySelector('.book-grid-template').cloneNode(true)
            gridItem.classList.remove('book-grid-template')
            gridItem.book = book
    
            // Select the elements within the gridItem that will be updated
            gridItem.querySelector('.book-title').textContent = capitalFirstWord(book.title)
            gridItem.querySelector('.author').textContent = capitalFirstWord(book.author)
            gridItem.querySelector('.page-count').textContent = book.pages

            // This will display or not display the 'read' svg depending on the users read selection
            if (read === true) {
            gridItem.querySelector('.read').textContent = 'Yes'
            } else {
            let readSvg = gridItem.querySelector('#read-svg')
            gridItem.querySelector('.read').textContent = 'No'
            readSvg.style.display = 'block'
            }

             // Append the gridItem to the gridContainer
            this.gridContainer.append(gridItem)
    
            // Add the title of the gridItem to the Titles list
            let listContainer = document.querySelector('.list')
            let listItem = document.createElement('li')
            listItem.textContent = capitalFirstWord(book.title)
            listContainer.append(listItem)

             // Invoke the info function when the gridItem is clicked
            gridItem.addEventListener('click', (e) => {
            if (gridItem.book && !(e.target.closest('.book-buttons-container'))) {
                alert(gridItem.book.info())
            }
        })
        })
    }

    addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(capitalFirstWord(title), author, pages, read)
        this.myLibrary.push(newBook);
        this.updateDisplay();
    }

    removeFromLibrary(bookTitle) {
        // Remove book from library
        let bookIndex = this.myLibrary.findIndex(book => book.title === bookTitle)


        if (bookIndex !== -1){
            this.myLibrary.splice(bookIndex, 1)
            this.updateDisplay()
        } 
    }

    displayBooks() {
        // Display books in the gridContainer
    }

    setupEventListeners() {
        // Set up event listeners for buttons, gridContainer, etc.
        this.overlay.addEventListener('click', (event) =>{
            if (event.target === this.overlay) {
            this.closeAndResetForm()
            }
        })

        this.submitButton.addEventListener('click', (e) => {

            let title = this.formTitle.value.trim();
            let author = this.formAuthor.value.trim();
            let pages = this.formPages.value.trim();
    
            if (!title || !author || !pages) {
                // Stop execution if required fields are missing, and alert user
                alert('Please fill in all required fields.');
                return; 
            }
    
            e.preventDefault()
            this.addBookToLibrary(title, author, pages, this.formRead.checked)
            this.closeAndResetForm()
        })

        this.newBookButton.addEventListener('click', () =>{ 
            this.formContainer.style.display = 'flex'
            this.overlay.style.display = 'block'
        })


        this.gridContainer.addEventListener('click', (e) => {
            // Find the closest delete button
            let deleteButton = e.target.closest('#delete-svg');
            
            // This will delete the grid item, when the trash icon is clicked
            if (deleteButton) {
                // Delete button was clicked
                let gridItem = deleteButton.closest('.book-grid-container'); // Find the parent grid item
                if (gridItem) {
    
                    // Remove the grid item from the gridContainer
                    this.gridContainer.removeChild(gridItem);
                    
                    let bookTitle = gridItem.querySelector('.book-title').textContent
                    let listItems = document.querySelectorAll('.list li')
    
                    this.removeFromLibrary(bookTitle)
                    
                    listItems.forEach(element => {
                        if (element.textContent === bookTitle) {
                            element.remove()
                        }
                    });
                }
            }
    
            // Find the closest read button
            this.readButton = e.target.closest('#read-svg'); 
    
            // This will change the status of the book to read, when the read icon is clicked
            if (this.readButton) {
                // Find the parent grid item
                this.gridItem = this.readButton.closest('.book-grid-container');
                if (this.gridItem) {
                    // Set the read property to true, for purposes of the alert
                    this.gridItem.book.read = true
                    this.gridItem.querySelector('.read').textContent = 'Yes'
                    // Remove the read button from the container
                    this.readButton.style.display = 'none'
                }
            }
        });

    }

    closeAndResetForm() {
        // Close and reset the form
        this.formContainer.style.display = 'none'
        this.overlay.style.display = 'none'
        this.formTitle.value = ''
        this.formAuthor.value = ''
        this.formPages.value = ''
        this.formRead.checked = false
    }
}

const libraryManager = new LibraryManager();

/*
Part 1: Classes

Create a Book class that has the following properties:
- element (HTMLElement)
- title (string)
- author (string)
- numCopies (number, the number of copies available)

Add the following methods:
- displayBook():
    - Generates HTML to represent the book
*/

class Book {
    constructor(element, title, author, numCopies) {
        this.element = element;
        this.title = title;
        this.author = author;
        this.numCopies = numCopies;

        this.element.classList.add('book');

        this.updateElement();

        this.element.addEventListener('click', () => this.onClick());
    }

    onClick() {
        this.borrow();
        this.updateElement();
    }

    borrow() {
        if (this.numCopies > 0) {
            this.numCopies--;
            if (this.numCopies === 0) {
                this.element.classList.add('disabled');
            }
        }
    }

    updateElement() {
        this.element.innerHTML = '';

        const titleElement = document.createElement('p');
        titleElement.classList.add('book_title');
        titleElement.innerText = this.title;

        const authorElement = document.createElement('p');
        authorElement.classList.add('book_author');
        authorElement.innerText = 'By ' + this.author;

        const numCopiesElement = document.createElement('p');
        numCopiesElement.classList.add('book_num_copies');
        numCopiesElement.innerText = 'Available copies: ' + this.numCopies;

        this.element.appendChild(titleElement);
        this.element.appendChild(authorElement);
        this.element.appendChild(numCopiesElement);
    }
}


/* 
Part 2: Encapsulation

Add a function borrow():
    - Decreases the number of copies by numSold and prints how many copies are left. 
    - If there are no more copies left, add a class "disabled" to the element.
*/

/* 
Part 3: Inheritance

Create a new class Textbook which extends Book.
*/

class Textbook extends Book {
    constructor(element, title, author, numCopies) {
        super(element, title, author, numCopies);

        this.element.classList.add('textbook');
    }
}

/* 
Part 4: Polymorphism

Create a new class Ebook that doesn't display the number of available copies.
*/

class Ebook extends Book {
    constructor(element, title, author, numCopies) {
        super(element, title, author, numCopies);

        this.element.classList.add('ebook');
    }

    updateElement() {
        this.element.innerHTML = '';

        const titleElement = document.createElement('p');
        titleElement.classList.add('book_title');
        titleElement.innerText = this.title;

        const authorElement = document.createElement('p');
        authorElement.classList.add('book_author');
        authorElement.innerText = 'By ' + this.author;

        this.element.appendChild(titleElement);
        this.element.appendChild(authorElement);
    }
}

const library = document.querySelector('.library');

for (let i = 0; i < books.length; i++) {
    const bookEl = document.createElement('div');
    const book = new Book(bookEl, books[i].name, books[i].author, books[i].numOfCopies);
    library.appendChild(bookEl);
}

const textbookEl = document.createElement('div');
const textbook = new Textbook(textbookEl, "Textbook", "Teacher", 10);
library.appendChild(textbookEl);

const ebookEl = document.createElement('div');
const ebook = new Ebook(ebookEl, "E-book", "Some author");
library.appendChild(ebookEl);
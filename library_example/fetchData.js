/*
    Part 5: Fetch the JSON data using fetch()
*/

function fetchData() {
    return fetch('books.json')
        .then((response) => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            return data;
        })
}


// fetchData()
//     .then((data) => {
//         displayData(data);
//     });


/*
    Part 6: Fetch data from Gutendex 
*/

class ExternalBook extends Book {
    constructor(element, title, author, image) {
        super(element, title, author);
        this.image = image;
    }

    renderElement() {
        this.element.innerHTML = '';

        const titleElement = document.createElement('p');
        titleElement.classList.add('book_title');
        titleElement.innerText = this.title;
        this.element.appendChild(titleElement);

        this.author.forEach(a => {
            const authorElement = document.createElement('p');
            authorElement.classList.add('book_author');
            authorElement.innerText = 'By ' + a.name;
            this.element.appendChild(authorElement);
        });

        this.element.style.backgroundImage = `url("${this.image}")`;
    }
}

async function fetchGutendexData() {
    const response = await fetch('https://gutendex.com/books/');
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data.results;
    }
    return [];
}

fetchGutendexData()
    .then((data) => {
        const library = document.querySelector('.library');

        for (let i = 0; i < books.length; i++) {
            const bookEl = document.createElement('div');
            const book = new ExternalBook(bookEl, data[i].title, data[i].authors, data[i].formats['image/jpeg']);
            book.renderElement();
            library.appendChild(bookEl);
        }
    })
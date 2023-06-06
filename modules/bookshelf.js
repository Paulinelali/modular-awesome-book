export default class Bookshelf {
  constructor() {
    this.booklist = [];
    this.teal = true;
    this.section = document.querySelector('.books');
  }

  addBook(book) {
    if (book.getTitle() !== '' && book.getAuthor() !== '') {
      this.booklist.push(book);
      localStorage.setItem('booklist', JSON.stringify(this.booklist));
    }
  }

  removeBook(book) {
    let x = 0;
    for (let i = 0; i < this.booklist.length; i += 1) {
      if (this.booklist[i].title === book.title) {
        x = i;
      }
    }
    this.booklist.splice(x, 1);
    localStorage.setItem('booklist', JSON.stringify(this.booklist));
    this.restockBookshelf();
  }

  appendToDOM(bookObj) {
    const books = document.querySelector('.books');
    const book = document.createElement('div');
    book.classList.add('book');
    book.innerHTML = `
      <p>"${bookObj.title}" by ${bookObj.author}</p>
      `;

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
      book.remove();
      this.removeBook(bookObj);
      localStorage.setItem('booklist', JSON.stringify(this.booklist));
    });

    if (this.teal) {
      book.classList.add('teal');
      removeBtn.classList.add('teal-btn');
      this.teal = false;
    } else {
      this.teal = true;
    }

    book.appendChild(removeBtn);
    books.appendChild(book);
  }

  getBooklist() {
    return this.booklist;
  }

  setBooklist(booklist) {
    this.section.innerHTML = '';
    this.booklist = booklist;
    booklist.forEach((bookObj) => {
      this.appendToDOM(bookObj);
    });
  }

  restockBookshelf() {
    document.title = 'Awesome Books | All Books';
    this.section.innerHTML = '<h1>All awesome books</h1>';
    this.booklist.forEach((bookObj) => {
      this.appendToDOM(bookObj);
    });
  }
}
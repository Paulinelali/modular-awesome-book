import Bookshelf from './modules/bookshelf.js';
import Book from './modules/book.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

const section = document.querySelector('.books');
const contact = document.querySelector('#contact');
const bookShelf = new Bookshelf();

const date = () => {
  const date = document.querySelector('#date');
  date.innerHTML = `${DateTime.now().toLocaleString(DateTime.DATE_MED)}, ${DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS)}`;
};

if (localStorage.getItem('booklist') !== null && localStorage.getItem('booklist').length > 0) {
  bookShelf.setBooklist(JSON.parse(localStorage.getItem('booklist')));
}

const formToggle = document.querySelector('#new');
section.innerHTML = '';
formToggle.addEventListener('click', () => {
  date();
  document.title = 'Awesome Books | New Book';
  section.innerHTML = `
    <h2>Add a new book</h2>
    <form class="add-book-form">
      <input type="text" placeholder="Title" id="title" required>
      <input type="text" placeholder="Author" id="author" required>
      <button type="button" class="add-book">Add</button>
    </form>
  `;
  const bookName = document.querySelector('#title');
  const bookAuthor = document.querySelector('#author');
  const addBookBtn = document.querySelector('.add-book');
  const form = document.querySelector('.add-book-form');

  addBookBtn.addEventListener('click', () => {
    const { value: title } = bookName;
    const { value: author } = bookAuthor;
    const newBook = new Book(title, author);
    bookShelf.addBook(newBook);
    form.reset();
  });
});

const logo = document.querySelector('#logo');
logo.addEventListener('click', () => {
  date();
  bookShelf.restockBookshelf();
});

const restockBtn = document.querySelector('#list');
restockBtn.addEventListener('click', () => {
  date();
  bookShelf.restockBookshelf();
});

contact.addEventListener('click', () => {
  date();
  document.title = 'Awesome Books | Contact';
  section.innerHTML = `
  <h1>Contact information</h1>
  <p class="contact-padding">Do you have any questions or you just want to say "Hello"? You can reach out to us!</p>
  <ul class="contact-padding list-wrapper">
    <li>Our e-mail: mail@mail.com</li>
    <li>Our phone number: 0043586534422</li>
    <li>Our address: StreetName 22, 84503 City, Country</li>
  </ul>
  `;
});
bookShelf.restockBookshelf();

date();

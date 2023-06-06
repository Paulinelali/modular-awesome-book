export default class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  getTitle() {
    return this.title;
  }

  getAuthor() {
    return this.author;
  }
}
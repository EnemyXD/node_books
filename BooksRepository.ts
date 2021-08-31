const Book = require("./models/book");

module.exports = class BookRepository {
  id: number;
  title: string;
  authors: string;
  description: string;
  constructor(id: number, title: string, authors: string, description: string) {
    this.id = id;
    this.title = title;
    this.authors = authors;
    this.description = description;
  }

  createBook(): void {}
  getBook(id: number): void {}
  getBooks(): void {}
  updateBook(id: number): void {}
  deleteBook(id: number): void {}
  // async createBook(book: book) {
  //   try {
  //     const newBook = new Book({ ...book });
  //     await newBook.save();
  //     return true;
  //   } catch (e) {
  //     console.log(e);
  //     return e;
  //   }
  // }
  // async getBook(id: number) {
  //   try {
  //     const book = await Book.find({ id });
  //     return book;
  //   } catch (e) {
  //     console.log(e);
  //     return e;
  //   }
  // }
  // async getBooks() {
  //   try {
  //     const books = await Book.find();
  //     return books;
  //   } catch (e) {
  //     console.log(e);
  //     return e;
  //   }
  // }
  // async updateBook(id: number, book: book) {
  //   try {
  //     await Book.findByIdAndUpdate({ id, book });
  //     return true;
  //   } catch (e) {
  //     console.log(e);
  //     return e;
  //   }
  // }
  // async deleteBook(id: number) {
  //   try {
  //     await Book.deleteOn({ _id: id });
  //     return true;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
};

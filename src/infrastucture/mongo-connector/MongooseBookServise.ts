import { injectable } from "inversify";
import { BookServiseBase } from "../../book/BooksRepository";
import { IBook } from "../../book/IBook";
import Book from "./BookModel";

@injectable()
export class MongooseBookService extends BookServiseBase {
  async createBook(data: IBook): Promise<IBook> {
    const book = new Book(data);
    await book.save();
    return book;
  }
  async getBook(id: number): Promise<IBook> {
    const book = await Book.findById(id);
    return book;
  }
  async getBooks(): Promise<IBook[]> {
    const books = await Book.find();
    return books;
  }
  async updateBook(id: number, data: IBook): Promise<IBook> {
    const book = await Book.findByIdAndUpdate(id, {
      ...data,
      date: `${Date.now()}`,
    });

    return book;
  }
  async deleteBook(id: number): Promise<void> {
    await Book.findByIdAndDelete(id);
  }
}

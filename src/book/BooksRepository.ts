import { IBook } from "./IBook";

export abstract class BookServiseBase {
  abstract createBook(data: IBook): Promise<IBook>;
  abstract getBook(id: number): Promise<IBook>;
  abstract getBooks(): Promise<IBook[]>;
  abstract updateBook(id: number, data: IBook): Promise<IBook>;
  abstract deleteBook(id: number): Promise<void>;
}


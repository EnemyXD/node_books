import { injectable } from "inversify";

@injectable()
export class IBookRepository {
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
}

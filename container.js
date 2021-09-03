import { Container } from "inversify";
import { BookRepository } from "./BooksRepository";
// const { Container } = require("inversify");
// const BookRepository = require("./BooksRepository.js");

export const myContainer = new Container();
myContainer.bind(BookRepository).toSelf();

// module.exports = myContainer;

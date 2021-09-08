// import { Container } from "inversify";
// import  BookRepository  from "./BooksRepository.js";
const { Container } = require("inversify");
const IBookRepository = require("./BooksRepository.js");

const myContainer = new Container();
myContainer.bind(IBookRepository).toSelf();

const repo = myContainer.get(IBookRepository);
module.exports = myContainer;

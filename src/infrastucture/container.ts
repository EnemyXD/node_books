import { Container, decorate, injectable } from "inversify";
import { BookServiseBase } from "../book/BooksRepository";
import { MongooseBookService } from "./mongo-connector/MongooseBookServise";
// const { Container } = require("inversify");
// const IBookRepository = require("./BooksRepository.js");

const myContainer = new Container();

myContainer.bind(BookServiseBase).to(MongooseBookService).inSingletonScope();

export default myContainer;

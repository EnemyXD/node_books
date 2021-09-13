"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var BooksRepository_1 = require("../book/BooksRepository");
var MongooseBookServise_1 = require("./mongo-connector/MongooseBookServise");
// const { Container } = require("inversify");
// const IBookRepository = require("./BooksRepository.js");
var myContainer = new inversify_1.Container();
myContainer.bind(BooksRepository_1.BookServiseBase).to(MongooseBookServise_1.MongooseBookService).inSingletonScope();
exports.default = myContainer;
//# sourceMappingURL=container.js.map
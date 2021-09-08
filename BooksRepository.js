"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var injectable = require("inversify").injectable;
var IBookRepository = /** @class */ (function () {
    function IBookRepository() {
    }
    // id: number;
    // title: string;
    // authors: string;
    // description: string;
    // constructor(id: number, title: string, authors: string, description: string) {
    //   this.id = id;
    //   this.title = title;
    //   this.authors = authors;
    //   this.description = description;
    // }
    IBookRepository.prototype.createBook = function () { };
    IBookRepository.prototype.getBook = function (id) { };
    IBookRepository.prototype.getBooks = function () { };
    IBookRepository.prototype.updateBook = function (id) { };
    IBookRepository.prototype.deleteBook = function (id) { };
    IBookRepository = __decorate([
        injectable()
    ], IBookRepository);
    return IBookRepository;
}());
module.exports = IBookRepository;
//# sourceMappingURL=BooksRepository.js.map
"use strict";
// const express = require("express");
// const fileMiddleware = require("../../middleware/file");
// const Book = require("../../models/book");
// const User = require("../../models/users");
// const passport = require("passport");
// const path = require("path");
// const myContainer = require("../../container");
// const IBookRepository = require("../../BooksRepository");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var file_1 = __importDefault(require("../../../infrastucture/middleware/file"));
var BookModel_1 = __importDefault(require("../../../infrastucture/mongo-connector/BookModel"));
var users_1 = __importDefault(require("../../../user/users"));
var passport_1 = __importDefault(require("passport"));
var path_1 = __importDefault(require("path"));
var container_1 = __importDefault(require("../../../infrastucture/container"));
var BooksRepository_1 = require("../../../book/BooksRepository");
var router = express_1.default.Router();
function createAdmin() {
    return __awaiter(this, void 0, void 0, function () {
        var admin, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    admin = new users_1.default({ username: "admin", password: "pass" });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, admin.save()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
createAdmin();
router.get("/discussion/:id", function (req, res) {
    res.sendFile(path_1.default.resolve("/code/views/discussionExample.html"));
});
router.post("/signin", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, newUser, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newUser = new users_1.default({ username: username, password: password });
                return [4 /*yield*/, newUser.save()];
            case 2:
                _b.sent();
                res.redirect("/library/login");
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                console.log(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/signin", function (req, res) {
    res.render("signin", { title: "Регистрация" });
});
router.get("/profile", function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        if (req.session) {
            req.session.returnTo = req.originalUrl || req.url;
        }
        return res.redirect("/library/login");
    }
    next();
}, function (req, res) {
    var user = req.user[0];
    console.log(user);
    console.log("" + user.username + ("" + user.id));
    res.render("profile", {
        title: "Профиль",
        username: user.username,
        id: user.id,
    });
});
router.get("/logout", function (req, res) {
    req.logOut();
    res.redirect("/library");
});
router.get("/login", function (req, res) {
    res.render("login", { title: "Авторизация" });
});
router.post("/login", passport_1.default.authenticate("local", {
    failureRedirect: "/library/login",
}), function (req, res) {
    console.log("req.user: " + req.user);
    res.redirect("/library");
});
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("ROUTES");
                console.log(BookModel_1.default);
                return [4 /*yield*/, BookModel_1.default.find()];
            case 1:
                books = _a.sent();
                res.render("books/index", {
                    title: "Книги",
                    library: books,
                });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                console.log(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/create", function (req, res) {
    res.render("books/create", {
        title: "Library | Создать книгу",
        book: {},
    });
});
router.post("/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, authors, description, newBook, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, authors = _a.authors, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newBook = new BookModel_1.default({ title: title, authors: authors, description: description });
                return [4 /*yield*/, newBook.save()];
            case 2:
                _b.sent();
                res.redirect("/library");
                return [3 /*break*/, 4];
            case 3:
                e_4 = _b.sent();
                console.log(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/update/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, BookModel_1.default.findById(id).select("title description authors")];
            case 2:
                book = _a.sent();
                if (book) {
                    res.render("books/update", {
                        title: "Library | Книга",
                        book: book,
                    });
                }
                else {
                    res.status(404).redirect("/404");
                }
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                console.log(e_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/update/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, authors, description, update, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.body, title = _a.title, authors = _a.authors, description = _a.description;
                update = {
                    title: title,
                    authors: authors,
                    description: description,
                };
                return [4 /*yield*/, BookModel_1.default.findByIdAndUpdate(id, update)];
            case 2:
                _b.sent();
                res.redirect("/library/" + id);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _b.sent();
                console.log(e_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, BookModel_1.default.findById(id).select("title description authors")];
            case 2:
                book = _a.sent();
                if (book) {
                    res.render("books/view", {
                        title: "Library | Обзор",
                        book: book,
                    });
                }
                else {
                    res.status(404).redirect("/404");
                }
                return [3 /*break*/, 4];
            case 3:
                e_7 = _a.sent();
                console.log(e_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/delete/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, BookModel_1.default.deleteOne({ _id: id })];
            case 2:
                _a.sent();
                res.redirect("/library");
                return [3 /*break*/, 4];
            case 3:
                e_8 = _a.sent();
                console.log(e_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/upload", file_1.default.single("books"), function (req, res) {
    if (req.file) {
        var path_2 = req.file.path;
        console.log(path_2);
        res.json(path_2);
    }
    else {
        res.json(null);
    }
});
// router.get("/:id/download", (req, res) => {
//   const { id } = req.params;
//   const object = store.library.filter((el) => el.id === id);
//   if (object) {
//     res.download(
//       __dirname + `/../public/${object[0].fileBook}.txt`,
//       "cover.txt",
//       (err) => {
//         if (err) res.status(404).json;
//       }
//     );
//   } else {
//     res.status(404).json("NOT FOUND FILE");
//   }
// });
router.get("/bookRepository/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var service, book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                service = container_1.default.get(BooksRepository_1.BookServiseBase);
                return [4 /*yield*/, service.getBook(req.params.id)];
            case 1:
                book = _a.sent();
                res.json(book);
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=methods.js.map
const express = require("express");
const fileMiddleware = require("../../middleware/file");
const Book = require("../../models/book");
const User = require("../../models/users");
const passport = require("passport");
const path = require("path");
const myContainer = require("../../container");
const IBookRepository = require("../../BooksRepository");
// const express = require("express");
// const router = express.Router();
// const fileMiddleware = require("../../middleware/file");
// const Book = require("../../models/book");
// const User = require("../../models/users");
// const passport = require("passport");
// const path = require("path");
// const myContainer = require("../../container");
// const BookRepository = require("../../BooksRepository");

const router = express.Router();

async function createAdmin() {
  const admin = new User({ username: "admin", password: "pass" });
  try {
    await admin.save();
  } catch (e) {
    console.log(e);
  }
}

createAdmin();
router.get("/discussion/:id", (req, res) => {
  res.sendFile(path.resolve("/code/views/discussionExample.html"));
});
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username: username, password: password });
    await newUser.save();
    res.redirect("/library/login");
  } catch (e) {
    console.log(e);
  }
});
router.get("/signin", (req, res) => {
  res.render("signin", { title: "Регистрация" });
});
router.get(
  "/profile",
  (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
      return res.redirect("/library/login");
    }
    next();
  },
  (req, res) => {
    const user = req.user[0];
    console.log(user);
    console.log(`${user.username}` + `${user.id}`);
    res.render("profile", {
      title: "Профиль",
      username: user.username,
      id: user.id,
    });
  }
);
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/library");
});
router.get("/login", (req, res) => {
  res.render("login", { title: "Авторизация" });
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/library/login",
  }),
  (req, res) => {
    console.log("req.user: " + req.user);
    res.redirect("/library");
  }
);
router.get("/", async (req, res) => {
  try {
    console.log("ROUTES");
    console.log(Book);
    const books = await Book.find();
    res.render("books/index", {
      title: "Книги",
      library: books,
    });
  } catch (e) {
    console.log(e);
  }
});
router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Library | Создать книгу",
    book: {},
  });
});
router.post("/create", async (req, res) => {
  const { title, authors, description } = req.body;

  try {
    const newBook = new Book({ title, authors, description });
    await newBook.save();
    res.redirect("/library");
  } catch (e) {
    console.log(e);
  }
});
router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).select("title description authors");

    if (book) {
      res.render("books/update", {
        title: "Library | Книга",
        book: book,
      });
    } else {
      res.status(404).redirect("/404");
    }
  } catch (e) {
    console.log(e);
  }
});
router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { title, authors, description } = req.body;

    const update = {
      title: title,
      authors: authors,
      description: description,
    };

    await Book.findByIdAndUpdate(id, update);

    res.redirect(`/library/${id}`);
  } catch (e) {
    console.log(e);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).select("title description authors");

    if (book) {
      res.render("books/view", {
        title: "Library | Обзор",
        book: book,
      });
    } else {
      res.status(404).redirect("/404");
    }
  } catch (e) {
    console.log(e);
  }
});
router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Book.deleteOne({ _id: id });
    res.redirect("/library");
  } catch (e) {
    console.log(e);
  }
});
router.post("/upload", fileMiddleware.single("books"), (req, res) => {
  if (req.file) {
    const { path } = req.file;
    console.log(path);
    res.json(path);
  } else {
    res.json(null);
  }
});
router.get("/:id/download", (req, res) => {
  const { id } = req.params;
  const object = store.library.filter((el) => el.id === id);
  if (object) {
    res.download(
      __dirname + `/../public/${object[0].fileBook}.txt`,
      "cover.txt",
      (err) => {
        if (err) res.status(404).json;
      }
    );
  } else {
    res.status(404).json("NOT FOUND FILE");
  }
});
router.get("/bookRepository/:id", async (req, res) => {
  const repo = myContainer.get(IBookRepository);
  console.log(repo);
  //const book = await repo.getBook(req.params.id);
});

module.exports = router;

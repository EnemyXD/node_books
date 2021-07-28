const express = require("express");
const router = express.Router();
const fileMiddleware = require("../../middleware/file");
const Book = require("../../index");

router.get("/", async (req, res) => {
  try {
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

module.exports = router;

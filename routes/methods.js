const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const fileMiddleware = require("../middleware/file");

router.post("/login", (req, res) => {
  res.status(201).json(store.user);
});
router.get("/", (req, res) => {
  const books = await Book.find();
  res.json(books);
});
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).redirect("NOT FOUND");
  }
});
router.post("", (req, res) => {
  const { ...args } = req.body;
  const book = new Book({ ...args });
  store.library.push(book);

  res.status(201);
  res.json(book);
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const update = {
    title: title,
    authors: authors,
    description: description,
  };

  await Book.findByIdAndUpdate(id, update);

  res.status(201);
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  await Book.deleteOne({ _id: id });
  res.json(true);
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
  // const { id } = req.params;

  // const object = store.library.filter((el) => el.id === id);

  // if (object) {
  //   res.download(
  //     __dirname + `/../public/${object[0].fileBook}.txt`,
  //     "cover.txt",
  //     (err) => {
  //       if (err) res.status(404).json;
  //     }
  //   );
  // } else {
  //   res.status(404).json("NOT FOUND FILE");
  // }
});

module.exports = router;

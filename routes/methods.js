const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const fileMiddleware = require("../middleware/file");

router.post("/login", (req, res) => {
  res.status(201).json(store.user);
});
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (e) {
    console.log(e);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    if (book) {
      res.json(book);
    } else {
      res.status(404).redirect("NOT FOUND");
    }
  } catch (e) {
    console.log(e);
  }
});
router.post("", async (req, res) => {
  try {
    const { ...args } = req.body;
    const book = new Book({ ...args });
    store.library.push(book);

    res.status(201);
    res.json(book);
  } catch (e) {
    console.log(e);
  }
});
router.put("/:id", async (req, res) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Book.deleteOne({ _id: id });
    res.json(true);
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

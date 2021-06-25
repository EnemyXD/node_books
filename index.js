const express = require("express");
const formData = require("express-form-data");
const cors = require("cors");

const books = require("./models.js");

let store = {
  user: {
    id: 0,
    login: "test",
    mail: "test@mail.ru",
  },
  library: [],
};

for (let i = 0; i < 10; i++) {
  const book = new books();
  store.library.push(book);
}

console.log(store);

const app = express();
app.use(formData.parse());
app.use(cors());

app.post("/api/users/login", (req, res) => {
  res.status(201).json(store.user);
});
app.get("/api/library", (req, res) => {
  const library = store.library;
  res.json(library);
});
app.get("/api/library/:id", (req, res) => {
  const library = store.library;
  const { id } = req.params;
  const idx = library.findIndex((el) => el.id === id);
  idx !== -1 ? res.json(library[idx]) : res.status(404).json("NOT FOUND");
});
app.post("/api/library", (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const book = new books(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  );
  store.library.push(book);

  res.status(201);
  res.json(book);
});
app.put("/api/library/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const idx = store.library.findIndex((el) => el.id === id);

  if (idx !== -1) {
    store.library[idx] = {
      ...store.library[idx],
      title: title,
      description: description,
      authors: authors,
      favorite: favorite,
      fileCover: fileCover,
      fileName: fileName,
    };
    res.json(store.library[idx]);
  } else {
    res.status(404).json("NOT FOUND");
  }
});
app.delete("/api/library/:id", (req, res) => {
  const { id } = req.params;

  const idx = store.library.findIndex((el) => el.id === id);

  if (idx !== -1) {
    store.library.splice(idx, 1);
    res.json(true);
  } else {
    res.status(404).json("NOT FOUND");
  }
});

app.listen(3010, "localhost", () => {
  console.log("Server started.");
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const loggerMiddleware = require("./middleware/logger");
const errorMiddleware = require("./middleware/error");

const booksRouter = require("./routes/methods");
const indexRouter = require("./routes/indexRouter");
const urlBooksRouter = require("./routes/urlRouter/methods");

const bookScheme = require("./models/book");

const PORT = process.env.SERVER_PORT || 3000;
const UserDB = process.env.DB_USERNAME || "admin";
const PasswordDB = process.env.DB_PASSWORD || "pass";
const NameDB = process.env.DB_NAME || "library";
const HostDB = process.env.DB_HOST || "mongodb://mongodb:27017/";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set("view engine", "ejs");

// app.use(loggerMiddleware);

app.use("/public", express.static(__dirname + "/public"));

app.use("/", indexRouter);
app.use("/library", urlBooksRouter);
app.use("/api/library", booksRouter);

app.use(errorMiddleware);

async function Start() {
  try {
    const mongo = mongoose.createConnection(HostDB, {
      user: UserDB,
      pass: PasswordDB,
      dbName: NameDB,
    });

    module.exports = mongo.model("Book", bookScheme);

    // mongoose.connect(HostDB, {
    //     user: UserDB,
    //     pass: PasswordDB,
    //     dbName: NameDB,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })

    app.listen(PORT, () => {
      console.log(`start server PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

Start();

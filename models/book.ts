const { Schema, model } = require("mongoose");
const uid = require("node-unique-id-generator");
const mongoose = require("mongoose");

const UserDB = process.env.DB_USERNAME || "admin";
const PasswordDB = process.env.DB_PASSWORD || "pass";
const NameDB = process.env.DB_NAME_LIBRARY || "library";
const HostDB = process.env.DB_HOST || "mongodb://mongodb:27017/";

interface Book {
  title: string;
  description: string;
  authors: string;
  date: string;
  favorite: string;
  fileCover: string;
  fileName: string;
}

const bookScheme: Book = new Schema({
  // id: {
  //   type: String,
  //   default: `${uid.generateUniqueId()}`,
  // },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  authors: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  favorite: {
    type: String,
    default: "",
  },
  fileCover: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "",
  },
});

try {
  console.log("CONNECTDB");
  const mongo = mongoose.createConnection(HostDB, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
  });
  const Book = mongo.model("Book", bookScheme);
  console.log(Book);
  module.exports = Book;
} catch (e) {
  console.log(e);
  process.exit(131);
}

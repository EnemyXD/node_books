import mongoose, { Schema, Document } from "mongoose";
import { IBook } from "../../book/IBook";

const UserDB = process.env.DB_USERNAME || "admin";
const PasswordDB = process.env.DB_PASSWORD || "pass";
const NameDB = process.env.DB_NAME_LIBRARY || "library";
const HostDB = process.env.DB_HOST || "mongodb://mongodb:27017/";

const bookScheme = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  authors: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let Book: mongoose.Model<IBook & Document> | null = null;

try {
  const mongo = mongoose.createConnection(HostDB, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
  });
  Book = mongo.model<IBook & Document>("Book", bookScheme);
} catch (e) {
  console.log(e);
  process.exit(131);
}

export default Book;

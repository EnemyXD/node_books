import Uid from "node-unique-id-generator";
import moment from "moment";
// const Uid = require("node-unique-id-generator");
// const moment = require("moment");

export class book {
  constructor(
    title = "--------",
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = ""
  ) {
    this.id = Uid.generateUniqueId();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = `${moment().format("DD-MM-YYYY - HH-mm-ss_SSS")} - ${
      this.id
    }`;
  }
}
// module.exports = book;

const { Schema, model } = require("mongoose");
const uid = require("node-unique-id-generator");

const bookSchema = new Schema({
  id: {
    type: String,
    default: uid.generateUniqueId(),
  },
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

module.exports = model("Book", bookSchema);

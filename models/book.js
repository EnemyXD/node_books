"use strict";
var Schema = require("mongoose").Schema;
var mongoose = require("mongoose");
// const { Schema, model } = require("mongoose");
// const uid = require("node-unique-id-generator");
// const mongoose = require("mongoose");
var UserDB = process.env.DB_USERNAME || "admin";
var PasswordDB = process.env.DB_PASSWORD || "pass";
var NameDB = process.env.DB_NAME_LIBRARY || "library";
var HostDB = process.env.DB_HOST || "mongodb://mongodb:27017/";
var bookScheme = new Schema({
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
    var mongo = mongoose.createConnection(HostDB, {
        user: UserDB,
        pass: PasswordDB,
        dbName: NameDB,
    });
    var Book = mongo.model("Book", bookScheme);
    module.exports = Book;
}
catch (e) {
    console.log(e);
    process.exit(131);
}
//# sourceMappingURL=book.js.map
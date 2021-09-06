import pkg from "mongoose";
import mongoose from "mongoose";
import uid from "node-unique-id-generator";
// const { Schema, model } = require("mongoose");
// const mongoose = require("mongoose");
// const uid = require("node-unique-id-generator");
const { Schema } = pkg;

const UserDB = process.env.DB_USERNAME || "admin";
const PasswordDB = process.env.DB_PASSWORD || "pass";
const NameDB = process.env.DB_NAME_USERS || "users";
const HostDB = process.env.DB_HOST || "mongodb://mongodb:27017/";

const userSchema = new Schema({
  id: {
    type: String,
    default: uid.generateUniqueId(),
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

let User;

try {
  const mongo = mongoose.createConnection(HostDB, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
  });
  User = mongo.model("User", userSchema);
} catch (e) {
  console.log(e);
  process.exit(131);
}

export default User;

const { Schema, model } = require("mongoose");
const uid = require("node-unique-id-generator");

const userSchema = new Schema({
  // id: {
  //   type: String,
  //   default: uid.generateUniqueId(),
  // },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("User", userSchema);

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { Schema } = require("mongoose");
// const mongoose = require("mongoose");
// const uid = require("node-unique-id-generator");
// const { Schema, model } = require("mongoose");
// const mongoose = require("mongoose");
// const uid = require("node-unique-id-generator");
var mongoose_1 = __importStar(require("mongoose"));
// import uid from "node-unique-id-generator";
var UserDB = process.env.DB_USERNAME || "admin";
var PasswordDB = process.env.DB_PASSWORD || "pass";
var NameDB = process.env.DB_NAME_USERS || "users";
var HostDB = process.env.DB_HOST || "mongodb://mongodb:27017/";
var userSchema = new mongoose_1.Schema({
    // id: {
    //   type: String,
    //   default: uid.generateUniqueId(),
    // },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
var User = null;
try {
    var mongo = mongoose_1.default.createConnection(HostDB, {
        user: UserDB,
        pass: PasswordDB,
        dbName: NameDB,
    });
    User = mongo.model("User", userSchema);
}
catch (e) {
    console.log(e);
    process.exit(131);
}
exports.default = User;
//# sourceMappingURL=users.js.map
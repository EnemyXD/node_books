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
var mongoose_1 = __importStar(require("mongoose"));
var UserDB = process.env.DB_USERNAME || "admin";
var PasswordDB = process.env.DB_PASSWORD || "pass";
var NameDB = process.env.DB_NAME_LIBRARY || "library";
var HostDB = process.env.DB_HOST || "mongodb://mongodb:27017/";
var bookScheme = new mongoose_1.Schema({
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
var Book = null;
try {
    var mongo = mongoose_1.default.createConnection(HostDB, {
        user: UserDB,
        pass: PasswordDB,
        dbName: NameDB,
    });
    Book = mongo.model("Book", bookScheme);
}
catch (e) {
    console.log(e);
    process.exit(131);
}
exports.default = Book;
//# sourceMappingURL=BookModel.js.map
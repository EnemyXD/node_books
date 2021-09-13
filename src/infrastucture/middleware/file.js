"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const multer = require("multer");
// const moment = require("moment");
var multer_1 = __importDefault(require("multer"));
var moment_1 = __importDefault(require("moment"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        var date = (0, moment_1.default)().format("DD-MM-YYYY HH-mm-ss_SSS");
        cb(null, date + "-" + file.originalname);
    },
});
var allowedType = ["text/plain", "image/png", "image/jpeg"];
var fileFilter = function (req, file, cb) {
    allowedType.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};
exports.default = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
});
//# sourceMappingURL=file.js.map
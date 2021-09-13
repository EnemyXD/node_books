"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const fs = require("fs");
// const os = require("os");
// const moment = require("moment");
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
var moment_1 = __importDefault(require("moment"));
exports.default = (function (req, res, next) {
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var method = req.method, url = req.url;
    var userAgent = req.get("user-agent");
    var date = (0, moment_1.default)().format("DD-MM-YYYY - HH-mm-ss_SSS");
    var data = date + " " + method + ": " + url + " - user-agent: " + userAgent;
    fs_1.default.appendFile("server.log", data + os_1.default.EOL, function (err) {
        if (err)
            throw err;
    });
    next();
});
//# sourceMappingURL=logger.js.map
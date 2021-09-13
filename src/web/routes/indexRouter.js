"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
// const router = express.Router();
// const express = require("express");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    res.render("index", { title: "Главная" });
});
// module.exports = router;
exports.default = router;
//# sourceMappingURL=indexRouter.js.map
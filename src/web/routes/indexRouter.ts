// const express = require("express");
// const router = express.Router();
// const express = require("express");
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Главная" });
});

// module.exports = router;
export default router;

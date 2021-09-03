import express from "express";
const router = express.Router();
// const express = require("express");
// const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Главная" });
});

export default router;

// module.exports = router;

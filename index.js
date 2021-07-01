const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const loggerMiddleware = require("./middleware/logger");
const errorMiddleware = require("./middleware/error");

const booksRouter = require("./routes/methods");
const indexRouter = require("./routes/indexRouter");

const app = express();
app.use(bodyParser());
app.use(cors());

app.use(loggerMiddleware);

// app.use("/public", express.static(__dirname + "/public"));

app.use("/", indexRouter);
app.use("/api/library", booksRouter);

app.use(errorMiddleware);

app.listen(3010, "localhost", () => {
  console.log("Server started.");
});

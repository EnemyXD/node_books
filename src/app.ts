import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import { IStrategyOptions, Strategy } from "passport-local";
import User, { IUser } from "./user/users";

import http from "http";
import * as socketIO from "socket.io";

import loggerMiddleware from "./infrastucture/middleware/logger";
import errorMiddleware from "./infrastucture/middleware/error";

import booksRouter from "./web/routes/methods";
import indexRouter from "./web/routes/indexRouter";
import urlBooksRouter from "./web/routes/urlRouter/methods";
import mongoose, { Document } from "mongoose";
// require("reflect-metadata");
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("./models/users");

// const http = require("http");
// const socketIO = require("socket.io");

// const loggerMiddleware = require("./middleware/logger");
// const errorMiddleware = require("./middleware/error");

// const booksRouter = require("./routes/methods");
// const indexRouter = require("./routes/indexRouter");
// const urlBooksRouter = require("./routes/urlRouter/methods");

const PORT = process.env.SERVER_PORT || 3000;

const options = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: false,
} as IStrategyOptions;

passport.use(
  "local",
  new Strategy(options, async (username, password, done) => {
    await User.findOne({ username: username }, (err: any, user: IUser) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      console.log(user);
      return done(null, user);
    });
  })
);

passport.serializeUser((user: any, cb) => {
  console.log(user);
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    await User.find({ id }, (err, user) => {
      cb(err, user);
    });
  } catch (e) {
    console.log(e);
  }
});

const app = express();
const server = new http.Server(app);
const io = new socketIO.Server(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());
app.set("view engine", "ejs");

// app.use(loggerMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(__dirname + "/public"));

app.use("/", indexRouter);
app.use("/library", urlBooksRouter);
app.use("/api/library", booksRouter);

app.use(errorMiddleware);

io.on("connection", (socket) => {
  const { id } = socket;
  console.log("socket " + socket);
  console.log("socket connected: " + id);

  socket.on("message-to-me", (msg) => {
    msg.type = "me";
    socket.emit("message-to-me", msg);
  });

  socket.on("message-to-all", (msg) => {
    msg.type = "all";
    socket.broadcast.emit("message-to-all", msg);
    socket.emit("message-to-all", msg);
  });

  const { roomName } = socket.handshake.query;
  console.log(`Socket roomName: ${roomName}`);
  socket.join(roomName);
  socket.on("message-to-room", (msg) => {
    msg.type = `room: ${roomName}`;
    socket.to(roomName).emit("message-to-room", msg);
    socket.emit("message-to-room", msg);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected: " + id);
  });
});

server.listen(PORT, () => {
  console.log(`start server PORT ${PORT}`);
});

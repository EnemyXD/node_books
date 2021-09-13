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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var users_1 = __importDefault(require("./user/users"));
var http_1 = __importDefault(require("http"));
var socketIO = __importStar(require("socket.io"));
var error_1 = __importDefault(require("./infrastucture/middleware/error"));
var methods_1 = __importDefault(require("./web/routes/methods"));
var indexRouter_1 = __importDefault(require("./web/routes/indexRouter"));
var methods_2 = __importDefault(require("./web/routes/urlRouter/methods"));
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
var PORT = process.env.SERVER_PORT || 3000;
var options = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: false,
};
passport_1.default.use("local", new passport_local_1.Strategy(options, function (username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users_1.default.findOne({ username: username }, function (err, user) {
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
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }));
passport_1.default.serializeUser(function (user, cb) {
    console.log(user);
    cb(null, user._id);
});
passport_1.default.deserializeUser(function (id, cb) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_1.default.find({ id: id }, function (err, user) {
                        cb(err, user);
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var app = (0, express_1.default)();
var server = new http_1.default.Server(app);
var io = new socketIO.Server(server);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use((0, cors_1.default)());
app.set("view engine", "ejs");
// app.use(loggerMiddleware);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/public", express_1.default.static(__dirname + "/public"));
app.use("/", indexRouter_1.default);
app.use("/library", methods_2.default);
app.use("/api/library", methods_1.default);
app.use(error_1.default);
io.on("connection", function (socket) {
    var id = socket.id;
    console.log("socket " + socket);
    console.log("socket connected: " + id);
    socket.on("message-to-me", function (msg) {
        msg.type = "me";
        socket.emit("message-to-me", msg);
    });
    socket.on("message-to-all", function (msg) {
        msg.type = "all";
        socket.broadcast.emit("message-to-all", msg);
        socket.emit("message-to-all", msg);
    });
    var roomName = socket.handshake.query.roomName;
    console.log("Socket roomName: " + roomName);
    socket.join(roomName);
    socket.on("message-to-room", function (msg) {
        msg.type = "room: " + roomName;
        socket.to(roomName).emit("message-to-room", msg);
        socket.emit("message-to-room", msg);
    });
    socket.on("disconnect", function () {
        console.log("socket disconnected: " + id);
    });
});
server.listen(PORT, function () {
    console.log("start server PORT " + PORT);
});
//# sourceMappingURL=app.js.map
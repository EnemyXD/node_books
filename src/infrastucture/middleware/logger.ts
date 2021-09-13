// const fs = require("fs");
// const os = require("os");
// const moment = require("moment");
import fs from "fs";
import os from "os";
import moment from "moment";

export default (req: any, res: any, next: any) => {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  const { method, url } = req;
  const userAgent = req.get("user-agent");

  let date = moment().format("DD-MM-YYYY - HH-mm-ss_SSS");
  let data = `${date} ${method}: ${url} - user-agent: ${userAgent}`;

  fs.appendFile("server.log", data + os.EOL, (err) => {
    if (err) throw err;
  });

  next();
};

// const multer = require("multer");
// const moment = require("moment");
import multer from "multer";
import moment from "moment";

const storage = multer.diskStorage({
  destination(req: any, file: any, cb: any) {
    cb(null, "public");
  },
  filename(req: any, file: any, cb: any) {
    const date = moment().format("DD-MM-YYYY HH-mm-ss_SSS");
    cb(null, `${date}-${file.originalname}`);
  },
});

const allowedType = ["text/plain", "image/png", "image/jpeg"];

const fileFilter = (req: any, file: any, cb: any) => {
  allowedType.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

export default multer({
  storage,
  fileFilter,
});

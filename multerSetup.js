var multer = require("multer");

module.exports.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/pdf");
  },
  filename: (req, file, cb) => {
    console.log();
    cb(null, `${req.body.resourceSubjectCode}_${req.body.resourceName}_${file.originalname}`);
  },
});

module.exports.maxSize = 10 * 1000 * 1000;

module.exports.upload = multer({
  storage: this.storage,
});

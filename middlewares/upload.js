const multer = require("multer");
const path=require('path');
const excelFilter = (req, file, cb) => {

  let ext = path.extname(file.originalname);
  console.log('ext',ext); 
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    cb("Only images are allowed", false);
  } else {
    cb(null, true);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now() + "_" + file.originalname}`);
  },
  file_id: (req, file, cb) => {
    cb(null, `${Date.now()}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter })
module.exports = uploadFile;

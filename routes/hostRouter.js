const express = require("express");
const multer = require("multer");
const mul = multer();
const hostController = require("../controllers/hostController");
const { validateToken } = require("../middlewares/auth");
const upload = require("../utils/uploader");

const router = express.Router();

router.post("", upload.array("videoFiles", 5), hostController.createData);
//router.post("", mul.array("testFiles", 5), hostController.createData);

module.exports = { router };

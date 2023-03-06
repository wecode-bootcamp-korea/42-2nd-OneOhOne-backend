const express = require("express");
const multer = require("multer");
const mul = multer();
const hostController = require("../controllers/hostController");
const { validateToken } = require("../middlewares/auth");
const uploader = require("../utils/uploader");

const router = express.Router();

//router.post("", uploader.array("videoFile", 5), hostController.createHost);
router.post("", mul.array("testFiles", 5), hostController.createData);

module.exports = { router };

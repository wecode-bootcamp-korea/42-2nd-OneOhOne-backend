const express = require("express");
const lectureController = require("../controllers/lectureController");

const router = express.Router();

router.get("", lectureController.getLectures);

module.exports = { router };

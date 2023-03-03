const express = require("express");
const lectureController = require("../controllers/lectureController");

const router = express.Router();

router.get("", lectureController.getLectures);
router.get("/:lectureId", lectureController.getLectureDetail);

module.exports = { router };

const express = require("express");

const videoController = require("../controllers/videoController");

const router = express.Router();

router.get("/:videoId", videoController.getVideo);
router.get("/list/:lectureId",videoController.getLectureDetails);

module.exports=  { router };

const express = require("express");
const hostController = require("../controllers/hostController");
const { validateToken } = require("../middlewares/auth");

const router = express.Router();

router.post("/lectureInfo", validateToken, hostController.lectureInfo);
router.get("/creatorInfo", validateToken, hostController.creatorInfo);

module.exports = { router };

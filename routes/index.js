const express = require("express");
const router = express.Router();

const lectureRouter = require("./lectureRouter");

router.use("/lectures", lectureRouter.router);

module.exports = router;

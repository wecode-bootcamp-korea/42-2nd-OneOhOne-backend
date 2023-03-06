const express = require("express");
const router = express.Router();

const lectureRouter = require("./lectureRouter");
const userRouter = require("./userRouter");
const hostRouter = require("./hostRouter");

router.use("/lectures", lectureRouter.router);
router.use("/users", userRouter.router);
router.use("/host", hostRouter.router);

module.exports = router;

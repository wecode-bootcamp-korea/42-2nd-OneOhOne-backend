const express = require("express");
const router = express.Router();

const lectureRouter = require("./lectureRouter");
const userRouter = require("./userRouter");
const videoRouter = require("./videoRouter");

router.use("/lectures", lectureRouter.router);
router.use("/users",userRouter.router);
router.use("/videos",videoRouter.router);

module.exports = router;

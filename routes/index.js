const express = require("express");
const router = express.Router();

const lectureRouter = require("./lectureRouter");
const userRouter = require("./userRouter")
router.use("/lectures", lectureRouter.router);
router.use("/users",userRouter.router);

module.exports = router;

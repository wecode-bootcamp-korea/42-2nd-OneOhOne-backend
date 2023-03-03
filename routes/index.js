const express = require("express");
const router = express.Router();

const lectureRouter = require("./lectureRouter");
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');


router.use("/lectures", lectureRouter.router);
router.use('/users', userRouter.router);
router.use('/products', productRouter.router)

module.exports = router;

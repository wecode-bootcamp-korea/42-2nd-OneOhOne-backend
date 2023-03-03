const express = require('express');

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

const routes = express.Router();

routes.use('/users', userRouter.router);
routes.use('/products', productRouter.router)

module.exports = {routes};
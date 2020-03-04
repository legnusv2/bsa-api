const express = require('express');

const carRouter = require('../routes/car.routes');

const mainRouter = express.Router();

mainRouter.use('/cars', carRouter);

module.exports = mainRouter;

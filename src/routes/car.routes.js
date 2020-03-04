const express = require('express');

const {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
} = require('../controllers/car.controllers');

const carRouter = express.Router();

carRouter.get('', getAllCars);

carRouter.get('/:carId', getCarById);

carRouter.post('', createCar);

carRouter.put('/:carId', updateCar)

carRouter.delete('/:carId', deleteCar);

module.exports = carRouter;

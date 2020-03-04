const CarModel = require('../models/car.model');
const {
    newCarValidator,
    updateCarValidator,
    searchQueryValidator,
} = require('../validators/car.validators');

const createCar = async (req, res, next) => {
    try {
        const { error, value } = newCarValidator.validate(req.body);

        if (error) {
            return res.status(400)
                .json({
                    message: error.message,
                });
        }

        const newCar = new CarModel(value);

        await newCar.save();

        return res.status(201)
            .json(newCar);
    } catch (error) {
        next(error);
    }
}

const getAllCars = async (req, res, next) => {
    try {
        const { error, value } = searchQueryValidator.validate(req.query);

        if (error) {
            return res.status(400)
                .json({
                    message: error.message,
                })
        }

        const cars = await CarModel.find(value)
            .lean();

        return res.status(200)
            .json({
                cars,
            });
    } catch (error) {
        next(error);
    }
}

const getCarById = async (req, res, next) => {
    try {
        const { carId } = req.params;

        const car = await CarModel.findById(carId)
            .lean();

        return res.status(200)
            .json(car);
    } catch (error) {
        next(error);
    }
}

const updateCar = async (req, res, next) => {
    try {
        const { carId } = req.params;
        const { error, value } = updateCarValidator.validate(req.body);

        if (error) {
            return res.status(400)
                .json({
                    message: error.message,
                });
        }

        await CarModel.updateOne({ _id: carId }, value);
        const carUpdated = await CarModel.findById(carId)
            .lean();

        return res.status(200)
            .json(carUpdated);
    } catch (error) {
        next(error);
    }
}

const deleteCar = async (req, res, next) => {
    try {
        const { carId } = req.params;

        await CarModel.deleteOne({ _id: carId });

        return res.status(204)
            .end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
}

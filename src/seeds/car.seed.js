const carModel = require('../models/car.model');

const data = require('./data.json');

const seedCars = async () => {
    console.log('Inserting cars.')
    await carModel.create(data.cars);
}

module.exports = seedCars;

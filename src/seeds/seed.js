const customEnv = require('custom-env');
const path = require('path');

const mongodb = require('../config/db');
const seedCars = require('./car.seed');

const envToSeed = process.argv[2] || 'development';

customEnv.env(envToSeed, path.resolve(__dirname, '..', '..', 'env'));

(async function () {
    try {
        await mongodb.connect();

        await seedCars();

        await mongodb.disconnect();
    } catch (error) {
        console.log('Seeding could\' be completed.');
    }
}());

const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../src/config/app');
const mongodb = require('../src/config/db')
const CarModel = require('../src/models/car.model');

const carSample = require('./samples/car/car.json');
const carListSample = require('./samples/car/car-list.json');

const request = supertest(app);

const inMemoryDB = new MongoMemoryServer();

beforeAll(async (done) => {
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = await inMemoryDB.getPort();
    process.env.DB_NAME = await inMemoryDB.getDbName();

    await mongodb.connect();
    done();
})

afterEach(async (done) => {
    await CarModel.deleteMany();
    done()
})

afterAll(async (done) => {
    await mongodb.disconnect();
    await inMemoryDB.stop();
    done();
})

describe('GET /cars', () => {
    it('Should get an empty list of cars.', async () => {
        const response = await request.get('/api/cars');

        expect(response.status).toBe(200);
        expect(response.body.cars).toEqual([]);
    })

    it('Should get all 10 cars populated.', async () => {
        await CarModel.create(carListSample.cars);

        const response = await request.get('/api/cars');

        expect(response.status).toBe(200);
        expect(response.body.cars.length).toBe(carListSample.cars.length);
    })

    it('Should get car matched.', async () => {
        await CarModel.create(carListSample.cars);

        const response = await request.get('/api/cars')
            .query({
                make: 'Infiniti',
                year: 2009,
            });

        const cars = response.body.cars;

        expect(response.status).toBe(200);
        expect(cars.length).toBe(1);
        expect(cars[0]).toEqual(
            expect.objectContaining({
                make: 'Infiniti',
                year: 2009,
            })
        );
    })

    it('Should get specific car.', async () => {
        const newCar = new CarModel(carSample);
        await newCar.save();

        const response = await request.get(`/api/cars/${newCar._id}`);

        const car = response.body;
        expect(response.status).toBe(200)
        expect(car._id).toBe(String(newCar._id));
    })
})

describe('POST /cars', () => {
    it('Should create a new car.', async () => {
        const newCar = {
            make: 'Cadilac',
            model: 'Seville',
            year: 2003,
            color: 'Khaki',
            vin: '3D73M4HL3BG659234'
        }

        const response = await request.post('/api/cars')
            .send(newCar);

        const carCreated = response.body;

        expect(response.status).toBe(201);
        expect(carCreated).toEqual(
            expect.objectContaining({
                make: 'Cadilac',
                model: 'Seville',
                year: 2003,
                color: 'Khaki',
                vin: '3D73M4HL3BG659234'
            })
        );
    })

    it('Should return an error because of the year.', async () => {
        const newCar = {
            make: 'Cadilac',
            model: 'Seville',
            year: 1899,
            color: 'Khaki',
            vin: '3D73M4HL3BG659234'
        };

        const response = await request.post('/api/cars')
            .send(newCar);

        const error = response.body.message;

        expect(response.status).toBe(400);
        expect(error).toBe('"year" must be larger than or equal to 1900');
    })
})

describe('PUT /cars', () => {
    it('Should update existing car.', async () => {
        const carToUpdate = new CarModel(carSample);
        await carToUpdate.save();

        const response = await request.put(`/api/cars/${carToUpdate._id}`)
            .send({
                make: 'Not a Cadilac'
            });

        const carUpdated = response.body;

        expect(response.status).toBe(200);
        expect(carUpdated._id).toBe(String(carToUpdate._id));
        expect(carUpdated.make).toBe('Not a Cadilac');
    })

    it('Should validate body with at least one attribute to update.', async () => {
        const carToUpdate = new CarModel(carSample);
        await carToUpdate.save();

        const response = await request.put(`/api/cars/${carToUpdate._id}`)
            .send({});
            
        const error = response.body.message;

        expect(response.status).toBe(400);
        expect(error).toEqual(
            expect.stringContaining('must have at least 1 key')
        );
    })
})

describe('DELETE /api/cars', () => {
    it('Should delete existing car.', async () => {
        const carToDelete = new CarModel(carSample);
        await carToDelete.save();

        const response = await request.delete(`/api/cars/${carToDelete._id}`);

        const carsCount = await CarModel.countDocuments();

        expect(response.status).toBe(204);
        expect(carsCount).toBe(0);
    })
})

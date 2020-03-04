const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    vin: { type: String, required: true },
});

const carModel = mongoose.model('Car', carSchema);

module.exports = carModel;

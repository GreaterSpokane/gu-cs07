const mongoose = require('mongoose');

const averageRentSchema = mongoose.Schema({
    county: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    averageRent: {
        type: Number,
        required: true
    }
});

var AverageRent = mongoose.model('AverageRent', averageRentSchema, 'averagerent');
module.exports = AverageRent;
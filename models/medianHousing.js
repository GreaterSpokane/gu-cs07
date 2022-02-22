const mongoose = require('mongoose');

const medianHousingCostSchema = mongoose.Schema({
    county: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    medianHousingCost: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    }
});

var MedianHousingCost = mongoose.model('MedianHousingCost', medianHousingCostSchema, 'medianhousingcost');
module.exports = MedianHousingCost;
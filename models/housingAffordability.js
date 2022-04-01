const mongoose = require('mongoose');

const housingAffordabilityIndexSchema = mongoose.Schema({
    county: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    housingAffordabilityIndex: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

var HousingAffordabilityIndex = mongoose.model('HousingAffordabilityIndex', housingAffordabilityIndexSchema, 'housingaffordabilityindex');
module.exports = HousingAffordabilityIndex;
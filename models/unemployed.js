const mongoose = require('mongoose');

const unemployedSchema = mongoose.Schema({
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
    unemployed: {
        type: Number,
        required: true
    }
});

var Unemployed = mongoose.model('Unemployed', unemployedSchema, 'unemployed');
module.exports = Unemployed;
const mongoose = require('mongoose');

const medianIncomeSchema = mongoose.Schema({
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
    medianIncome: {
        type: Number,
        required: true
    }
});

var MedianIncome = mongoose.model('MedianIncome', medianIncomeSchema, 'medianincome');
module.exports = MedianIncome;
const mongoose = require('mongoose');

const naturalChangeSchema = mongoose.Schema({
    county: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    naturalChange: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

var NaturalChange = mongoose.model('NaturalChange', naturalChangeSchema, 'naturalchange');
module.exports = NaturalChange;
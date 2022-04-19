const mongoose = require('mongoose');

const employedSchema = mongoose.Schema({
    county: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    employed: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

var Employed = mongoose.model('Employed', employedSchema, 'employed');
module.exports = Employed;
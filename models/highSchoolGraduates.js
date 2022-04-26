const mongoose = require('mongoose');

const highSchooolGraduatesSchema = mongoose.Schema({
    county: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    highSchoolGraduates: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

var HighSchoolGraduates = mongoose.model('HighSchoolGraduates', highSchooolGraduatesSchema, 'highschoolgraduates');
module.exports = HighSchoolGraduates;
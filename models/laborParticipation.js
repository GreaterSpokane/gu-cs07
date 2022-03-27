const mongoose = require('mongoose');

const laborParticipationRateSchema = mongoose.Schema({
    county: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    laborParticipationRate: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

var LaborParticipationRate = mongoose.model('LaborParticipationRate', laborParticipationRateSchema, 'laborparticipationrates');
module.exports = LaborParticipationRate;
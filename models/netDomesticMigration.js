const mongoose = require('mongoose');

const netDomesticMigration = mongoose.Schema({
    county: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    netDomesticMigration: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

var NetDomesticMigration = mongoose.model('netDomesticMigration', netDomesticMigration, 'netdomesticmigration');
module.exports = NetDomesticMigration;
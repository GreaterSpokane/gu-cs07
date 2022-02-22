/**
 * Single entry retrieval controller for the Laborforce participation rate model
 */

const LaborParticipationRate = require("../../models/labor");

module.exports = async function getLabor(county, year) {
    try {
        var data = await LaborParticipationRate.findOne({ county: county, year: year }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'laborForce': data.laborForce,
            'laborParticipationRate': data.laborParticipationRate
        }

        return result
    } catch (err) {
        throw err;
    }
}
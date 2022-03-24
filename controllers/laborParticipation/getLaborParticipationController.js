/**
 * Single entry retrieval controller for the Laborforce participation rate model
 */

const LaborParticipationRate = require("../../models/laborParticipation");

/* Retrieve documents using county and year as a composite key  */
module.exports = async function getLaborParticipation(county, year) {
    try {
        var data = await LaborParticipationRate.findOne({ county: county, year: year }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'laborParticipationRate': data.laborParticipationRate
        }

        return result
    } catch (err) {
        throw err;
    }
}
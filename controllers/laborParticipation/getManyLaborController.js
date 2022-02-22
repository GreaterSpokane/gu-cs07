/**
 * Multiple entry retrieval controller for the Laborforce participation rate model
 */

const LaborParticipationRate = require("../../models/labor");

module.exports = async function getManyLabor(county, start_year, end_year) {
    try {


        /** TODO */
        var data = await LaborParticipationRate.findOne({ county: county }).exec();
        if (data == null) {
            //  Add json object to the year response that indicates data is missing for the year
        }
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
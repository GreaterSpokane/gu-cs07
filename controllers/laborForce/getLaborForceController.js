/**
 * Single entry retrieval controller for the Laborforce participation rate model
 */

const LaborForce = require("../../models/laborForce");

/* Retrieve documents using county and year as a composite key  */
module.exports = async function getLaborForce(county, year) {
    try {
        var data = await LaborForce.findOne({ county: county, year: year }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'laborForce': data.laborForce
        }

        return result;
    } catch (err) {
        throw err;
    }
}
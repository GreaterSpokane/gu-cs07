/**
 * Single entry retrieval controller for the Unemployed model
 */

const Unemployed = require("../../models/unemployed");

/* Retrieve documents using county and year as a composite key  */
module.exports = async function getUnemployed(county, year) {
    try {
        var data = await Unemployed.findOne({ county: county, year: year }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'unemployed': data.unemployed
        }

        return result;
    } catch (err) {
        throw err;
    }
}
/**
 * Single entry retrieval controller for the Average Rent indicator model
 */

const AverageRent = require("../../models/averageRent");

/* Retrieve documents using county and year as a composite key  */
module.exports = async function getAverageRent(county, year) {
    try {
        var data = await AverageRent.findOne({ county: county, year: year }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'averageRent': data.averageRent
        }

        return result;
    } catch (err) {
        throw err;
    }
}
/**
 * Single entry retrieval controller for the Employed model
 */

const Employed = require("../../models/employed");

/* Retrieve documents using county and year as a composite key  */
module.exports = async function getEmployed(county, year) {
    try {
        var data = await Employed.findOne({ county: county, year: year }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'employed': data.employed
        }

        return result;
    } catch (err) {
        throw err;
    }
}
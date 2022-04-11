/**
 * Single entry retrieval controller for the natural change model
 */

const NaturalChange = require("../../models/naturalChange");

/* Retrieve documents using county and year as a composite key  */
module.exports = async function getNaturalChange(county, year) {
    try {
        var data = await NaturalChange.findOne({ county: county, year: year }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'naturalChange': data.naturalChange
        }

        return result
    } catch (err) {
        throw err;
    }
}
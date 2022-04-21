const NaturalChange = require("../../models/naturalChange");

module.exports = async function getNaturalChange(county, year) {
    /**
     * Retrieve a single natural change indicator from the database
     * @param {string} county County for the data point
     * @param {string} year Year for the data point
     * @return {object} JSON object containing the requested indicator's data
     */

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
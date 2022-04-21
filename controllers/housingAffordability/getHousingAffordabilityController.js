const HousingAffordabilityIndex = require('../../models/housingAffordability');

module.exports = async function getHousingAffordability(county, year) {
    /**
     * Retrieve a single housing affordability index indicator from the database
     * @param {string} county County for the data point
     * @param {string} year Year for the data point
     * @return {object} JSON object containing the requested indicator's data
     */

    try {
        var data = await HousingAffordabilityIndex.findOne({ county: county, year: year }).exec();
        if (data == null)
            return { 'corr_id': null };
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'housingAffordabilityIndex': data.housingAffordabilityIndex
        }
        return result
    } catch (err) {
        throw err;
    }
}
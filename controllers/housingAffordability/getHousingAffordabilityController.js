/**
 * Single entry retrieval controller for the Housing Affordability Index model
 */

const HousingAffordabilityIndex = require('../../models/housingAffordability');

/* Retrieve documents using county and year as a composite key  */
module.exports = async function getHousingAffordability(county, year) {
    try {
        var data = await HousingAffordabilityIndex.findOne({ county: county, year: year }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
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
/**
 * Single entry retrieval controller for the median housing cost model
 */

const MedianHousingCost = require("../../models/medianHousing");

module.exports = async function getLabor(county, year) {
    try {
        var data = await MedianHousingCost.findOne({ county: county, year: year }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'medianHousingCost': data.medianHousingCost
        }

        return result
    } catch (err) {
        throw err;
    }
}
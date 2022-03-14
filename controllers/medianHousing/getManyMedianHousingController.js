/**
 * Multiple entry retrieval controller for the Median Housing Cost model
 */

const MedianHousingCost = require("../../models/medianHousing");

module.exports = async function getManyMedianHousing(county, start_year, end_year) {
    try {
        var data = await MedianHousingCost.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                medianHousingCost: { $first: '$medianHousingCost' }
            });
        var result = { 'county': county, 'data': data }
        return result
    } catch (err) {
        throw err;
    }
}
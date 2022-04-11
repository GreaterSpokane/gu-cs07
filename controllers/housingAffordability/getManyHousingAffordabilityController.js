/**
 * Multiple entry retrieval controller for the Housing Affordability Index model
 */

const HousingAffordabilityIndex = require('../../models/housingAffordability');

module.exports = async function getManyHousingAffordability(county, start_year, end_year) {
    try {
        var data = await HousingAffordabilityIndex.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                housingAffordabilityIndex: { $first: '$housingAffordabilityIndex' },
            })
            .sort({ _id: -1 });
        var result = { 'county': county, 'data': data };
        return result;
    } catch (err) {
        throw err;
    }
}
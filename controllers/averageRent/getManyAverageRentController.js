/**
 * Multiple entry retrieval controller for the Average Rent model
 */

const AverageRent = require("../../models/averageRent");

module.exports = async function getManyAverageRent(county, start_year, end_year) {
    try {
        var data = await AverageRent.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                averageRent: { $first: '$averageRent' },
            })
            .sort({ _id: -1 });
        var result = { 'county': county, 'data': data };
        return result;
    } catch (err) {
        throw err;
    }
}
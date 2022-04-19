/**
 * Multiple entry retrieval controller for the Unemployed model
 */

const Unemployed = require("../../models/unemployed");

module.exports = async function getManyUnemployed(county, start_year, end_year) {
    try {
        var data = await Unemployed.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                unemployed: { $first: '$unemployed' },
            })
            .sort({ _id: -1 });
        var result = { 'county': county, 'data': data };
        return result;
    } catch (err) {
        throw err;
    }
}
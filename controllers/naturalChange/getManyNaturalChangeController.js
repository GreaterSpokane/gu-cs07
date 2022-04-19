/**
 * Multiple entry retrieval controller for the natural change model
 */

const NaturalChange = require("../../models/naturalChange");

module.exports = async function getManyNaturalChange(county, start_year, end_year) {
    try {
        var data = await NaturalChange.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                naturalChange: { $first: '$naturalChange' },
            })
            .sort({ _id: -1 });
        var result = { 'county': county, 'data': data };
        return result;
    } catch (err) {
        throw err;
    }
}
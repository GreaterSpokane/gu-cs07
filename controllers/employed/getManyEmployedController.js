/**
 * Multiple entry retrieval controller for the Employed model
 */

const Employed = require("../../models/employed");

module.exports = async function getManyEmployed(county, start_year, end_year) {
    try {
        var data = await Employed.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                employed: { $first: '$employed' },
            })
            .sort({ _id: -1 });
        var result = { 'county': county, 'data': data };
        return result;
    } catch (err) {
        throw err;
    }
}
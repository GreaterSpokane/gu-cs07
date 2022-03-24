/**
 * Multiple entry retrieval controller for the Labor force model
 */

const LaborForce = require("../../models/laborForce");

module.exports = async function getManyLaborForce(county, start_year, end_year) {
    try {
        var data = await LaborForce.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                laborForce: { $first: '$laborForce' }
            });
        var result = { 'county': county, 'data': data };
        return result;
    } catch (err) {
        throw err;
    }
}
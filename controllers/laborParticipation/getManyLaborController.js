/**
 * Multiple entry retrieval controller for the Laborforce participation rate model
 */

const LaborParticipationRate = require("../../models/labor");

module.exports = async function getManyLabor(county, start_year, end_year) {
    try {
        var data = await LaborParticipationRate.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                laborForce: { $first: '$laborForce' },
                laborParticipationRate: { $first: '$laborParticipationRate' }
            });
        var result = { 'county': county, 'data': data };
        return result;
    } catch (err) {
        throw err;
    }
}
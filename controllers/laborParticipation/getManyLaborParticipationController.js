/**
 * Multiple entry retrieval controller for the Labor participation model
 */

const LaborParticipationRate = require("../../models/laborParticipation");

module.exports = async function getManyLaborParticipation(county, start_year, end_year) {
    try {
        var data = await LaborParticipationRate.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                laborParticipationRate: { $first: '$laborParticipationRate' }
            });
        var result = { 'county': county, 'data': data };
        return result;
    } catch (err) {
        throw err;
    }
}
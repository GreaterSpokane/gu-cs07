/**
 * Multiple entry retrieval controller for the net domestic migration
 */

const NetDomesticMigration = require("../../models/netDomesticMigration");

module.exports = async function getManyNetDomesticMigration(county, start_year, end_year) {
    try {
        var data = await NetDomesticMigration.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                netDomesticMigration: { $first: '$netDomesticMigration' },
            })
            .sort({ _id: -1 });
        var result = { 'county': county, 'data': data };
        return result;
    } catch (err) {
        throw err;
    }
}
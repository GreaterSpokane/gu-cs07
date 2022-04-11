/**
 * Single entry retrieval controller for the net domestic migration model
 */

const NetDomesticMigration = require("../../models/netDomesticMigration");

/* Retrieve documents using county and year as a composite key  */
module.exports = async function getNetDomesticMigration(county, year) {
    try {
        var data = await NetDomesticMigration.findOne({ county: county, year: year }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'netDomesticMigration': data.netDomesticMigration
        }

        return result
    } catch (err) {
        throw err;
    }
}
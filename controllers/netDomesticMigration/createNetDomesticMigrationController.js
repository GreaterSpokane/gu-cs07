/**
 * Creation controller for the net domestic migration model
 */

const NetDomesticMigration = require("../../models/netDomesticMigration");

module.exports = async function createNetDomesticMigration(
    county,
    state,
    year,
    netDomesticMigration) {
    /**
     * Creates new average rent indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} averageRent Average rent data for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
        const newLabor = new NetDomesticMigration({
            county: county,
            state: state,
            year: year,
            netDomesticMigration: parseFloat(netDomesticMigration),
        });

        await newLabor.save();
        return { corr_id: newLabor._id };
    } catch (err) {
        throw err
    }
}
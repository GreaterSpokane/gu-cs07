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
     * Should return id code of newly created Labor Force representation object
     */

    try {
        //  TODO: Validation steps
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
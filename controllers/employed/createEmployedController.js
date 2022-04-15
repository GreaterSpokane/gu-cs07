/**
 * Creation controller for the Employed indicator model
 */

const Employed = require("../../models/employed");

module.exports = async function createEmployed(
    county,
    state,
    year,
    employed) {
    /**
     * Should return id code of newly created employed indicator object
     */

    try {
        const newLabor = new Employed({
            county: county,
            state: state,
            year: year,
            employed: parseFloat(employed),
        });

        await newLabor.save();
        return { corr_id: newLabor._id };
    } catch (err) {
        throw err
    }
}
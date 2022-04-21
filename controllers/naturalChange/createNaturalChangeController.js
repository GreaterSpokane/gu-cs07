const NaturalChange = require("../../models/naturalChange");

module.exports = async function createLaborForce(
    county,
    state,
    year,
    naturalChange) {
    /**
     * Creates new natural change indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} naturalChange Natural change data for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
        const newNaturalChange = new NaturalChange({
            county: county,
            state: state,
            year: year,
            naturalChange: parseFloat(naturalChange),
        });

        await newNaturalChange.save();
        return { corr_id: newNaturalChange._id };
    } catch (err) {
        throw err
    }
}
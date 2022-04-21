const Employed = require("../../models/employed");

module.exports = async function createEmployed(
    county,
    state,
    year,
    employed) {
    /**
     * Creates new employed indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} employed Employed data for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
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
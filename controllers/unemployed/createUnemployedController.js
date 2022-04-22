const Unemployed = require("../../models/unemployed");

module.exports = async function createUnemployed(
    county,
    state,
    year,
    unemployed) {
    /**
     * Creates new unemployed indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} unemployed Unemployed data for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
        const newUnemployed = new Unemployed({
            county: county,
            state: state,
            year: year,
            unemployed: parseFloat(unemployed),
        });

        await newUnemployed.save();
        return { corr_id: newUnemployed._id };
    } catch (err) {
        throw err
    }
}
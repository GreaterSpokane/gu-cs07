const MedianIncome = require("../../models/medianIncome");

module.exports = async function createMedianIncome(
    county,
    state,
    year,
    medianIncome) {
    /**
     * Creates new median income indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} medianIncome Median income data for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
        const newMedianIncome = new MedianIncome({
            county: county,
            state: state,
            year: year,
            medianIncome: parseFloat(medianIncome),
        });

        await newMedianIncome.save();
        return { corr_id: newMedianIncome._id };
    } catch (err) {
        throw err
    }
}
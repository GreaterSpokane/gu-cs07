const AverageRent = require("../../models/averageRent");

module.exports = async function createAverageRent(
    county,
    state,
    year,
    averageRent) {
    /**
     * Creates new average rent indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} averageRent Average rent data for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
        //  TODO: Validation steps
        const newAverageRent = new AverageRent({
            county: county,
            state: state,
            year: year,
            averageRent: parseFloat(averageRent),
        });

        await newAverageRent.save();
        return { corr_id: newAverageRent._id };
    } catch (err) {
        throw err
    }
}
const HighschoolGraduates = require("../../models/highschoolGraduates");

module.exports = async function createHousingAffordability(
    county,
    state,
    year,
    highschoolGraduates) {
    /**
     * Creates new high school graduates indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} highschoolGraduates Percentage of high school graduates in population for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
        const newHighschoolGraduates = new HighschoolGraduates({
            county: county,
            state: state,
            year: year,
            highschoolGraduates: parseFloat(highschoolGraduates),
        });

        await newHighschoolGraduates.save();
        return { corr_id: newHighschoolGraduates._id };
    } catch (err) {
        throw err
    }
}
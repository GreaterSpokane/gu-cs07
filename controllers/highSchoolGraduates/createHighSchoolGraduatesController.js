const HighSchoolGraduates = require("../../models/highSchoolGraduates");

module.exports = async function createHighSchoolGraduates(
    county,
    state,
    year,
    highSchoolGraduates) {
    /**
     * Creates new high school graduates indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} highSchoolGraduates Percentage of high school graduates in population for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
        const newHighSchoolGraduates = new HighSchoolGraduates({
            county: county,
            state: state,
            year: year,
            highSchoolGraduates: parseFloat(highSchoolGraduates),
        });

        await newHighSchoolGraduates.save();
        return { corr_id: newHighSchoolGraduates._id };
    } catch (err) {
        throw err
    }
}
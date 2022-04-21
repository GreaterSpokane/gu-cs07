const LaborParticipationRate = require("../../models/laborParticipation");

module.exports = async function createLaborParticipation(
    county,
    state,
    year,
    laborParticipationRate) {
    /**
     * Creates new labor force participation rate indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} laborParticipationRate Labor force participation rate data for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
        //  TODO: Validation steps
        const newLabor = new LaborParticipationRate({
            county: county,
            state: state,
            year: year,
            laborParticipationRate: parseFloat(laborParticipationRate),
        });

        await newLabor.save();
        return { corr_id: newLabor._id };
    } catch (err) {
        throw err
    }
}
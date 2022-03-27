/**
 * Creation controller for the Laborforce participation rate model
 */

const LaborParticipationRate = require("../../models/laborParticipation");

module.exports = async function createLaborParticipation(
    county,
    state,
    year,
    laborParticipationRate) {
    /**
     * Should return id code of newly created Labor Participation Rate representation object
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
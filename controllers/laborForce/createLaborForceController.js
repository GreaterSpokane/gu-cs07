/**
 * Creation controller for the Laborforce participation rate model
 */

const LaborForce = require("../../models/laborForce");

module.exports = async function createLaborForce(
    county,
    state,
    year,
    laborForce) {
    /**
     * Should return id code of newly created Labor Participation Rate representation object
     */

    try {
        const existingEntry = await LaborParticipationRate.findOne({ year: year });
        if (existingEntry) throw new Error('A entry with that year already exists');

        //  TODO: Validation steps

        const newLabor = new LaborForce({
            county: county,
            state: state,
            year: year,
            laborForce: parseFloat(laborForce),
        }, );

        await newLabor.save();
        return { corr_id: newLabor._id };
    } catch (err) {
        throw err
    }
}
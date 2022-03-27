/**
 * Creation controller for the Labor force model
 */

const LaborForce = require("../../models/laborForce");

module.exports = async function createLaborForce(
    county,
    state,
    year,
    laborForce) {
    /**
     * Should return id code of newly created Labor Force representation object
     */

    try {
        //  TODO: Validation steps
        const newLabor = new LaborForce({
            county: county,
            state: state,
            year: year,
            laborForce: parseFloat(laborForce),
        });

        await newLabor.save();
        return { corr_id: newLabor._id };
    } catch (err) {
        throw err
    }
}
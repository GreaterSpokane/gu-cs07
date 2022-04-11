/**
 * Creation controller for the Natural change model
 */

const NaturalChange = require("../../models/naturalChange");

module.exports = async function createLaborForce(
    county,
    state,
    year,
    naturalChange) {
    /**
     * Should return id code of newly created Labor Force representation object
     */

    try {
        //  TODO: Validation steps
        const newNaturalChange = new NaturalChange({
            county: county,
            state: state,
            year: year,
            naturalChange: parseFloat(naturalChange),
        });

        await newNaturalChange.save();
        return { corr_id: newNaturalChange._id };
    } catch (err) {
        throw err
    }
}
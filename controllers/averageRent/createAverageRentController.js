/**
 * Creation controller for the Average Rent model
 */

const AverageRent = require("../../models/averageRent");

module.exports = async function createAverageRent(
    county,
    state,
    year,
    averageRent) {
    /**
     * Should return id code of newly created Average Rent indicator object
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
/**
 * Creation controller for the Unemployed indicator model
 */

const Unemployed = require("../../models/unemployed");

module.exports = async function createUnemployed(
    county,
    state,
    year,
    unemployed) {
    /**
     * Should return id code of newly created unemployed indicator object
     */

    try {
        //  TODO: Validation steps
        const newUnemployed = new Unemployed({
            county: county,
            state: state,
            year: year,
            unemployed: parseFloat(unemployed),
        });

        await newUnemployed.save();
        return { corr_id: newUnemployed._id };
    } catch (err) {
        throw err
    }
}
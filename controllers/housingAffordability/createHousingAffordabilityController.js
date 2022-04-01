/**
 * Creation controller for the Housing Affordability Index model
 */

const HousingAffordabilityIndex = require("../../models/housingAffordability");

module.exports = async function createHousingAffordability(
    county,
    state,
    year,
    housingAffordabilityIndex) {
    /**
     * Should return id code of newly created Housing Affordability Index representation object
     */

    try {
        //  TODO: Validation steps
        const newHousingAffordability = new HousingAffordabilityIndex({
            county: county,
            state: state,
            year: year,
            housingAffordabilityIndex: parseFloat(housingAffordabilityIndex),
        });

        await newHousingAffordability.save();
        return { corr_id: newHousingAffordability._id };
    } catch (err) {
        throw err
    }
}
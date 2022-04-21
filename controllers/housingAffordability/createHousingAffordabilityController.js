const HousingAffordabilityIndex = require("../../models/housingAffordability");

module.exports = async function createHousingAffordability(
    county,
    state,
    year,
    housingAffordabilityIndex) {
    /**
     * Creates new housing affordability index indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} housingAffordabilityIndex Housing affordability index data for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
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
const MedianHousingCost = require('../../models/medianHousing');

module.exports = async function createMedianHousing(
    county,
    state,
    year,
    medianHousingCost) {
    /**
     * Creates new median housing cost indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} medianHousingCost Median housing cost data for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
        const newHousing = new MedianHousingCost({
            county: county,
            state: state,
            medianHousingCost: medianHousingCost,
            year: year
        });

        await newHousing.save();
        return { corr_id: newHousing._id };
    } catch (err) {
        throw err
    }
}
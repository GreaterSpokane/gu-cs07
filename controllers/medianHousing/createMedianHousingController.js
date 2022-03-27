/**
 * Should return id code of newly created Median Housing Cost document 
 * in the mongoDB database
 */

const MedianHousingCost = require('../../models/medianHousing');

module.exports = async function createMedianHousing(
    county,
    state,
    year,
    medianHousingCost) {
    /**
     * Should return id code of newly created Median Housing Cost representation object
     */

    try {
        //  Validation steps

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
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
        const existingRecord = await MedianHousingCost.findOne({ year: year });
        if (existingRecord)
            throw new Error('A entry with that year already exists');

        //  Validation steps

        const newHousing = new MedianHousingCost({
            county: county,
            state: state,
            medianHousingCost: medianHousingCost,
            year: year
        });

        await newHousing.save();
        return { newId: newHousing._id };
    } catch (err) {
        throw err
    }
}
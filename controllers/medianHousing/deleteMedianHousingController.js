/**
 * Delete median housing cost entry by id
 */

const { ObjectId } = require('bson');
const MedianHousingCost = require('../../models/medianHousing');

module.exports = async function deleteMedianHousing(corr_id) {
    try {
        await MedianHousingCost.deleteOne({ _id: ObjectId(corr_id) },
            (err, docs) => {
                if (err) throw err;
                return { result: "Success" }
            })
    } catch (err) {
        return {
            result: "Failure",
            error: err
        }
    }
}
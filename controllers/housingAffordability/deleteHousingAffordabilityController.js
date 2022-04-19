/**
 * Delete Housing Affordability Index entry by id
 */

const { ObjectId } = require('bson');
const HousingAffordabilityIndex = require('../../models/housingAffordability');

module.exports = async function deleteHousingAffordability(corr_id) {
    try {
        await HousingAffordabilityIndex.deleteOne({ _id: ObjectId(corr_id) },
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
const HousingAffordabilityIndex = require('../../models/housingAffordability');

module.exports = async function deleteHousingAffordability(corr_id) {
    /**
     * Delete housing affordability index indicator entry from the database using the indicator's correlation id as a key
     * @param {string} corr_id Correlation id of the object to delete from the database
     * @returns {object} JSON object with the result of the deletion from the database
     */

    try {
        var findResult = await HousingAffordabilityIndex.findById(corr_id).exec();
        if (findResult == (null || undefined))
            return {
                result: "Failure",
                reason: "Could not find the data associated with that correlation id"
            }

        var deleteResult = await HousingAffordabilityIndex.deleteOne({ _id: findResult._id }).exec();
        if (deleteResult.deletedCount == 1)
            return { result: "Success" };
        else
            return {
                result: "Failure",
                reason: "Could not delete element from the database"
            }
    } catch {
        return { result: "Failure" };
    }
}
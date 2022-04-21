const { ObjectId } = require('bson');
const NetDomesticMigration = require('../../models/netDomesticMigration');

module.exports = async function deleteDomesticMigration(corr_id) {
    /**
     * Delete domestic migration indicator entry from the database using the indicator's correlation id as a key
     * @param {string} corr_id Correlation id of the object to delete from the database
     * @returns {object} JSON object with the result of the deletion from the database
     */

    try {
        await NetDomesticMigration.deleteOne({ _id: ObjectId(corr_id) },
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
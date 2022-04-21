const { ObjectId } = require('bson');
const NaturalChange = require('../../models/naturalChange');

module.exports = async function deleteNaturalChange(corr_id) {
    /**
     * Delete natural change indicator entry from the database using the indicator's correlation id as a key
     * @param {string} corr_id Correlation id of the object to delete from the database
     * @returns {object} JSON object with the result of the deletion from the database
     */

    try {
        await NaturalChange.deleteOne({ _id: ObjectId(corr_id) },
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
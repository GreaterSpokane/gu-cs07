/**
 * Delete Average Rent entry by id
 */

const { ObjectId } = require('bson');
const AverageRent = require('../../models/averageRent');

module.exports = async function deleteAverageRent(corr_id) {
    try {
        await AverageRent.deleteOne({ _id: ObjectId(corr_id) },
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
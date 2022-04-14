/**
 * Delete Employed entry by id
 */

const { ObjectId } = require('bson');
const Employed = require('../../models/employed');

module.exports = async function deleteEmployed(corr_id) {
    try {
        await Employed.deleteOne({ _id: ObjectId(corr_id) },
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
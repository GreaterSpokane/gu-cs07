/**
 * Delete labor partiticipation rate entry by id
 */

const { ObjectId } = require('bson');
const LaborForce = require('../../models/laborForce');

module.exports = async function deleteLaborForce(corr_id) {
    try {
        await LaborForce.deleteOne({ _id: ObjectId(corr_id) },
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
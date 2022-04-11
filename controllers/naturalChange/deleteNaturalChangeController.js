/**
 * Delete labor partiticipation rate entry by id
 */

const { ObjectId } = require('bson');
const NaturalChange = require('../../models/naturalChange');

module.exports = async function deleteLaborForce(corr_id) {
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
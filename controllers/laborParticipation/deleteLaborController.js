/**
 * Delete labor partiticipation rate entry by id
 */

const { ObjectId } = require('bson');
const LaborParticipationRate = require('../../models/labor');

module.exports = async function deleteLabor(corr_id) {
    try {
        await LaborParticipationRate.deleteOne({ _id: ObjectId(corr_id) },
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
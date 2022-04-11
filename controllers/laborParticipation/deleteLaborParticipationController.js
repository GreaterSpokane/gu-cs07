/**
 * Delete labor partiticipation rate entry by id
 */

const { ObjectId } = require('bson');
const LaborParticipationRate = require('../../models/laborParticipation');

module.exports = async function deleteLaborParticipation(corr_id) {
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
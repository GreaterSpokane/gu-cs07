/**
 * Delete net domestic migration entry by id
 */

const { ObjectId } = require('bson');
const NetDomesticMigration = require('../../models/netDomesticMigration');

module.exports = async function deleteLaborForce(corr_id) {
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
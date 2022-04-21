/**
 * Data serilizer for mass retrieval endpoint for Labor Force key indicator
 * @param {*} laborForceData Raw labor force indicator data from MongoDB
 * @returns {object} Serialized labor force data that can be displayed in the front end
 */

module.exports = async function serialize(laborForceData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedLaborForce = [];

    for (var i = laborForceData.data.length - 1; i >= 0; i--) {
        serializedYears.push(laborForceData.data[i]._id);
        serializedLaborForce.push(laborForceData.data[i].laborForce);
    }

    serializedResult.county = laborForceData.county;
    serializedResult.indicator = "Labor Force";
    serializedResult.indicator_id = 'lbf';
    serializedResult.years = serializedYears;
    serializedResult.laborForce = serializedLaborForce;
    return serializedResult;
}
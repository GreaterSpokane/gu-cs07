/**
 * Data serilizer for mass retrieval endpoint for Labor Force key indicator
 * @param {*} naturalChangeData Raw labor force indicator data from MongoDB
 * @returns {object} Serialized labor force data that can be displayed in the front end
 */

module.exports = async function serialize(naturalChangeData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedNaturalChange = [];

    for (var i = naturalChangeData.data.length - 1; i >= 0; i--) {
        serializedYears.push(naturalChangeData.data[i]._id);
        serializedNaturalChange.push(naturalChangeData.data[i].naturalChange);
    }

    serializedResult.county = naturalChangeData.county;
    serializedResult.indicator = "Natural Change";
    serializedResult.indicator_id = 'ntc';
    serializedResult.years = serializedYears;
    serializedResult.naturalChange = serializedNaturalChange;
    return serializedResult;
}
/**
 * Data serilizer for mass retrieval endpoint for Labor Force key indicator
 * @param {*} unemployedData Raw labor force indicator data from MongoDB
 * @returns {object} Serialized labor force data that can be displayed in the front end
 */

module.exports = async function serialize(unemployedData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedUnemployed = [];

    for (var i = unemployedData.data.length - 1; i >= 0; i--) {
        serializedYears.push(unemployedData.data[i]._id);
        serializedUnemployed.push(unemployedData.data[i].unemployed);
    }

    serializedResult.county = unemployedData.county;
    serializedResult.indicator = "Unemployed";
    serializedResult.indicator_id = 'uep';
    serializedResult.years = serializedYears;
    serializedResult.unemployed = serializedUnemployed;
    return serializedResult;
}
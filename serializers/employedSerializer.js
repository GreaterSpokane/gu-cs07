/**
 * Data serilizer for mass retrieval endpoint for Housing Affordability Index key indicator
 * @param {*} employedData Raw housing affordability index indicator data from MongoDB
 * @returns {object} Serialized housing affordability index data that can be displayed in the front end
 */

module.exports = async function serialize(employedData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedEmployed = [];

    for (var i = employedData.data.length - 1; i >= 0; i--) {
        serializedYears.push(employedData.data[i]._id);
        serializedEmployed.push(employedData.data[i].employed);
    }

    serializedResult.county = employedData.county;
    serializedResult.indicator = "Employed";
    serializedResult.indicator_id = 'emp';
    serializedResult.years = serializedYears;
    serializedResult.employed = serializedEmployed;
    return serializedResult;
}
/**
 * Data serilizer for mass retrieval endpoint for Housing Affordability Index key indicator
 * @param {*} housingAffordabilityData Raw housing affordability index indicator data from MongoDB
 * @returns {object} Serialized housing affordability index data that can be displayed in the front end
 */

 module.exports = async function serialize(housingAffordabilityData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedHousingAffordabilityIndex = [];

    for (var i = housingAffordabilityData.data.length - 1; i >= 0; i--) {
        serializedYears.push(housingAffordabilityData.data[i]._id);
        serializedHousingAffordabilityIndex.push(housingAffordabilityData.data[i].housingAffordabilityIndex);
    }

    serializedResult.county = housingAffordabilityData.county;
    serializedResult.indicator = "Housing Affordability Index";
    serializedResult.indicator_id = 'hai';
    serializedResult.years = serializedYears;
    serializedResult.housingAffordability = serializedHousingAffordabilityIndex;
    return serializedResult;
}
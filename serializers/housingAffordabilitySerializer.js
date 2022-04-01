/**
 * Data serilizer for mass retrieval endpoint for Housing Affordability Index key indicator
 * @param {*} housingAffordabilityData Raw housing affordability index indicator data from MongoDB
 * @returns {object} Serialized housing affordability index data that can be displayed in the front end
 */

 module.exports = async function serialize(housingAffordabilityData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedHousingAffordability = [];

    for (var i = housingAffordabilityData.data.length - 1; i >= 0; i--) {
        serializedYears.push(housingAffordabilityData.data[i]._id);
        serializedHousingAffordability.push(housingAffordabilityData.data[i].housingAffordability);
    }

    serializedResult.county = housingAffordabilityData.county;
    serializedResult.indicator = "Housing Affordability";
    serializedResult.indicator_id = 'hai';
    serializedResult.years = serializedYears;
    serializedResult.housingAffordability = serializedHousingAffordability;
    return serializedResult;
}
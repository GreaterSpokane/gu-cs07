/**
 * Data serializer for database mass reteival of Labor Participation 
 * Rate indicator data. Returns data in an acceptable format for the
 * front end visualizations
 */

module.exports = async function serialize(medianHousingData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedMedianHousingCost = [];

    for (var i = medianHousingData.data.length - 1; i >= 0; i--) {
        serializedYears.push(medianHousingData.data[i]._id);
        serializedMedianHousingCost.push(medianHousingData.data[i].medianHousingCost);
    }

    serializedResult.county = medianHousingData.county;
    serializedResult.indicator = 'Median Housing Cost'
    serializedResult.indicator_id = 'mhc'
    serializedResult.years = serializedYears;
    serializedResult.medianHousingCost = serializedMedianHousingCost;
    return serializedResult;
}
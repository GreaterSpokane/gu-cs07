/**
 * Data serilizer for mass retrieval endpoint for Labor Force key indicator
 * @param {*} averageRentData Raw labor force indicator data from MongoDB
 * @returns {object} Serialized labor force data that can be displayed in the front end
 */

module.exports = async function serialize(averageRentData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedAverageRent = [];

    for (var i = averageRentData.data.length - 1; i >= 0; i--) {
        serializedYears.push(averageRentData.data[i]._id);
        serializedAverageRent.push(averageRentData.data[i].averageRent);
    }

    serializedResult.county = averageRentData.county;
    serializedResult.indicator = "Average Rent";
    serializedResult.indicator_id = 'avr';
    serializedResult.years = serializedYears;
    serializedResult.averageRent = serializedAverageRent;
    return serializedResult;
}
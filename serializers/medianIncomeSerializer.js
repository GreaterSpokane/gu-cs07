/**
 * Data serilizer for mass retrieval endpoint for Median Income key indicator
 * @param {*} medianIncomeData Raw median income indicator data from MongoDB
 * @returns {object} Serialized median income data that can be displayed in the front end
 */

 module.exports = async function serialize(medianIncomeData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedMedianIncome = [];

    for (var i = medianIncomeData.data.length - 1; i >= 0; i--) {
        serializedYears.push(medianIncomeData.data[i]._id);
        serializedMedianIncome.push(medianIncomeData.data[i].medianIncome);
    }

    serializedResult.county = medianIncomeData.county;
    serializedResult.indicator = "Median Income";
    serializedResult.indicator_id = 'mhi';
    serializedResult.years = serializedYears;
    serializedResult.medianIncome = serializedMedianIncome;
    return serializedResult;
}
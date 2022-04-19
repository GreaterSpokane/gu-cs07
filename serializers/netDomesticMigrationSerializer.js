/**
 * Data serilizer for mass retrieval endpoint for Labor Force key indicator
 * @param {*} NetDomesticMigrationData Raw labor force indicator data from MongoDB
 * @returns {object} Serialized labor force data that can be displayed in the front end
 */

module.exports = async function serialize(netDomesticMigrationData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedNetDomesticMigration = [];

    for (var i = netDomesticMigrationData.data.length - 1; i >= 0; i--) {
        serializedYears.push(netDomesticMigrationData.data[i]._id);
        serializedNetDomesticMigration.push(netDomesticMigrationData.data[i].netDomesticMigration);
    }

    serializedResult.county = netDomesticMigrationData.county;
    serializedResult.indicator = "Net Domestic Migration";
    serializedResult.indicator_id = 'ndm';
    serializedResult.years = serializedYears;
    serializedResult.netDomesticMigration = serializedNetDomesticMigration;
    return serializedResult;
}
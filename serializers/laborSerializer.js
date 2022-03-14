/**
 * Data serializer for database mass reteival of Labor Participation 
 * Rate indicator data. Returns data in an acceptable format for the
 * front end visualizations
 */

module.exports = async function serialize(laborData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedLaborForce = [];
    var serializedLaborParticipationRate = [];

    for (var i = laborData.data.length - 1; i >= 0; i--) {
        serializedYears.push(laborData.data[i]._id);
        serializedLaborForce.push(laborData.data[i].laborForce);
        serializedLaborParticipationRate.push(laborData.data[i].laborParticipationRate);
    }

    serializedResult.county = laborData.county;
    serializedResult.indicator = 'Labor Force Participation Rate'
    serializedResult.indicator_id = 'lpr'
    serializedResult.years = serializedYears;
    serializedResult.laborForce = serializedLaborForce;
    serializedResult.laboParticipationRate = serializedLaborParticipationRate;
    return serializedResult;
}
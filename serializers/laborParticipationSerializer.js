/**
 * Data serializer for database mass reteival of Labor Participation 
 * Rate indicator data. Returns data in an acceptable format for the
 * front end visualizations
 */

module.exports = async function serialize(laborParticipationData) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedLaborParticipationRate = [];

    for (var i = laborParticipationData.data.length - 1; i >= 0; i--) {
        serializedYears.push(laborParticipationData.data[i]._id);
        serializedLaborParticipationRate.push(laborParticipationData.data[i].laborParticipationRate);
    }

    serializedResult.county = laborParticipationData.county;
    serializedResult.indicator = 'Labor Force Participation Rate'
    serializedResult.indicator_id = 'lpr'
    serializedResult.years = serializedYears;
    serializedResult.laborParticipationRate = serializedLaborParticipationRate;
    return serializedResult;
}
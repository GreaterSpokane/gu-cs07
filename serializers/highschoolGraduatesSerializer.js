/**
 * Data serilizer for mass retrieval endpoint for high school graduates key indicator
 * @param {*} highschoolGraduates Raw housing affordability index indicator data from MongoDB
 * @returns {object} Serialized housing affordability index data that can be displayed in the front end
 */

module.exports = async function serialize(highschoolGraduates) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedHighschooGraduates = [];

    for (var i = highschoolGraduates.data.length - 1; i >= 0; i--) {
        serializedYears.push(highschoolGraduates.data[i]._id);
        serializedHighschooGraduates.push(highschoolGraduates.data[i].highSchoolGraduates);
    }

    serializedResult.county = highschoolGraduates.county;
    serializedResult.indicator = "Highschool Graduates";
    serializedResult.indicator_id = 'hsg';
    serializedResult.years = serializedYears;
    serializedResult.housingAffordability = serializedHighschooGraduates;
    return serializedResult;
}
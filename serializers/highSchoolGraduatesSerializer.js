/**
 * Data serilizer for mass retrieval endpoint for high school graduates key indicator
 * @param {*} highSchoolGraduates Raw housing affordability index indicator data from MongoDB
 * @returns {object} Serialized housing affordability index data that can be displayed in the front end
 */

module.exports = async function serialize(highSchoolGraduates) {
    var serializedResult = {};
    var serializedYears = [];
    var serializedHighSchoolGraduates = [];

    for (var i = highSchoolGraduates.data.length - 1; i >= 0; i--) {
        serializedYears.push(highSchoolGraduates.data[i]._id);
        serializedHighSchoolGraduates.push(highSchoolGraduates.data[i].highSchoolGraduates);
    }

    serializedResult.county = highsShoolGraduates.county;
    serializedResult.indicator = "High School Graduates";
    serializedResult.indicator_id = 'hsg';
    serializedResult.years = serializedYears;
    serializedResult.highSchoolGraduates = serializedHighSchoolGraduates;
    return serializedResult;
}
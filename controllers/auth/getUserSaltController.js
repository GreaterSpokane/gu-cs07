const AuthUser = require("../../models/authUser");

module.exports = async function getUserSalt(username) {
    /**
     * Retrieve a given user's salt value from the database to validate their password
     * @param {string} username User name  to retrieve the salt value for
     * @return {object} JSON object containing the user's salt, if the user exists
     */
    var data = await AuthUser.findOne({ 'username': username }).exec();
    if (data == null)
        return { 'result': 'user does not exist' };
    var result = { 'salt': data.salt };
    return result;
}
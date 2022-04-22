const AuthUser = require("../../models/authUser");
const getUserSalt = require("./getUserSaltController");
const { sha512 } = require('./hashController');

module.exports = async function authorizeUser(username, password) {
    /**
     * Check if the username and the password correspond to a registered authorized user
     * @param {string} username Username to check against the database
     * @param {string} password Password to check against the database
     * @returns {object} JSON response with the registration status
     */
    var salt = await getUserSalt(username);

    if (salt.salt == undefined)
        return {
            'result': 'failure',
            'reason': 'cannot find user in list of registered users',
            'username': username
        };

    var hashPass = sha512(password, salt.salt);
    var data = await AuthUser.findOne({ username: username, password: hashPass.passwordHash }).exec();

    if (data == null)
        return {
            'result': "failure",
            'reason': "Login failed",
            'username': username
        };

    return {
        'result': "success",
        'username': username
    };
}
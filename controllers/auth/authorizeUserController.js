/**
 * Single entry retrieval controller for the AuthUser model
 */

const AuthUser = require("../../models/authUser");
const getUserSalt = require("./getUserSaltController");
const { sha512 } = require('./hashController');

/* Retrieve documents using county and year as a composite key  */
module.exports = async function authorizeUser(username, password) {
    var salt = await getUserSalt(username);

    if (salt.salt == undefined) {
        return {
            'result': 'failure',
            'reason': 'cannot find user in list of registered users',
            'username': username
        };
    }

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
/**
 * Single entry retrieval controller for the AuthUser model
 */

const AuthUser = require("../../models/authUser");
const getUserSalt = require("./getUserSaltController");
const crypto = require("crypto");

/**
 * hash password with sha512 hash algorithm
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

/* Retrieve documents using county and year as a composite key  */
module.exports = async function authorizeUser(username, password) {
    var salt = getUserSalt(username)
    var hashPass = sha512(password, salt);
    var data = await AuthUser.findOne({ username: username, password: hashPass }).exec();
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
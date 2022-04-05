/**
 * Single entry retrieval controller for the AuthUser model
 */

require('dotenv').config();
const AuthUser = require("../../models/authUser");
var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal */
        .slice(0, length); /** return required number of characters */
};

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

/**
 * salt and hash password with sha512
 * @param {string} password - password to hash
 * @returns {string} - hashed password
 */
function saltHashPassword(password) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(password, salt);
    return passwordData;
};

/* Retrieve documents using county and year as a composite key  */
module.exports = async function createAuthUser(username, password) {

    //  Check that the domain matches allowed email domains
    var addressSignIdx = username.indexOf('@');
    if (addressSignIdx == -1) {
        //  No address sign, cannot sign up user without an email domain
        return {
            'result': "failed to register user",
            'reason': "User domain does not match host domain",
            'username': username
        };
    }

    //  TODO: Check that email is a real email
    var userDomain = username.substring(addressSignIdx + 1);
    console.log("User domain " + userDomain);
    if (userDomain !== process.env.GSI_DOMAIN && userDomain !== process.env.DEV_DOMAIN)
        return {
            'result': "failed to register user",
            'reason': "username not in allowed domain",
            'username': username
        };

    var hashPass = saltHashPassword(password);
    var hashedPassword = hashPass.passwordHash;
    var salt = hashPass.salt;
    console.log(hashedPassword)
    console.log(salt)
    const newUser = new AuthUser({
        username: username,
        password: hashedPassword,
        salt: salt
    })
    await newUser.save();
    return { 'result': "registered user", "username": username }
}
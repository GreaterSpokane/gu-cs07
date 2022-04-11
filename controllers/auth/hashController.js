const crypto = require('crypto');

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

module.exports = { saltHashPassword, sha512, genRandomString };
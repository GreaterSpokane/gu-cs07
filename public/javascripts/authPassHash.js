import crypto from "crypto";

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
module.exports = function genRandomString(length) {
    return randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal */
        .slice(0, length); /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
module.exports = function sha512(password, salt) {
    var hash = createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

/**
 * salt and hash password with 
 * @param {string} userpassword - password to hash
 * @returns {string} - hashed password
 */
module.exports = function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
}
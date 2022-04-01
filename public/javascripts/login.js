var crypto = require('crypto')

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal */
        .slice(0, length); /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
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
function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = ' + userpassword);
    console.log('Passwordhash = ' + passwordData.passwordHash);
    console.log('\nSalt = ' + passwordData.salt);
}

$(window).on('load', () => {
    console.log("Authorized user login window loaded successfully");

    $('#clear').on('click', function() {
        //  Clear button callback for erasing all user input
        console.log("Cleared login window input");
        $("#username").val("");
        $("#password").val("");
    });

    $('#back').on('click', function() {
        //  Back button callback for redirecting to index page
        console.log("Leaving authorized user sign-in page ..");
        $(window).attr('location', 'index');
    })
});
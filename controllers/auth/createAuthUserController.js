/**
 * Single entry retrieval controller for the AuthUser model
 */

require('dotenv').config();
const AuthUser = require("../../models/authUser");
const { saltHashPassword, sha512, genRandomString } = require('./hashController');
const emailValidator = require('deep-email-validator');

async function isEmailValid(email) {
    return emailValidator.validate(email)
}

/* Retrieve documents using county and year as a composite key  */
module.exports = async function createAuthUser(username, password) {

    //  Check that the domain matches allowed email domains
    var addressSignIdx = username.indexOf('@');
    if (addressSignIdx == -1) {
        //  No address sign, cannot sign up user without an email domain
        var result = {
            'result': "failed to register user",
            'reason': "domain does not match allowed domains",
            'username': username
        };
        return result;
    }

    //  Check the email domain
    var userDomain = username.substring(addressSignIdx + 1);
    if (userDomain !== process.env.GSI_DOMAIN && userDomain !== process.env.DEV_DOMAIN) {
        var result = {
            'result': "failed to register user",
            'reason': "domain does not match allowed domains",
            'username': username
        };
        return result;
    }

    // //  assert that the email is a real email
    // var { valid, reason, validators } = await isEmailValid(username);
    // if (!valid)
    //     return {
    //         'result': "failed to register user",
    //         'reason': "email is not a real email: " + reason,
    //         'username': username
    //     };

    var hashPass = saltHashPassword(password);
    var hashedPassword = hashPass.passwordHash;
    var salt = hashPass.salt;
    var newUser = new AuthUser({
        username: username,
        password: hashedPassword,
        salt: salt
    });

    await newUser.save();
    return {
        'result': "registered user",
        "username": username
    }
}
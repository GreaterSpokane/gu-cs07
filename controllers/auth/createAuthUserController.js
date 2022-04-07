/**
 * Single entry retrieval controller for the AuthUser model
 */

require('dotenv').config();
const AuthUser = require("../../models/authUser");
const { saltHashPassword } = require('./hashController');

/* Retrieve documents using county and year as a composite key  */
module.exports = async function createAuthUser(username, password) {

    //  Check that the domain matches allowed email domains
    var addressSignIdx = username.indexOf('@');
    if (addressSignIdx == -1) {
        //  No address sign, cannot sign up user without an email domain
        return {
            'result': "failed to register user",
            'reason': "domain does not match allowed domains",
            'username': username
        };
    }

    //  TODO: Check that email is a real email
    var userDomain = username.substring(addressSignIdx + 1);
    if (userDomain !== process.env.GSI_DOMAIN && userDomain !== process.env.DEV_DOMAIN)
        return {
            'result': "failed to register user",
            'reason': "domain does not match allowed domains",
            'username': username
        };

    var hashPass = saltHashPassword(password);
    var hashedPassword = hashPass.passwordHash;
    var salt = hashPass.salt;
    const newUser = new AuthUser({
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
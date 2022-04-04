/**
 * Single entry retrieval controller for the AuthUser model
 */

const AuthUser = require("../../models/authUser");

/* Retrieve documents using county and year as a composite key  */
module.exports = async function createAuthUser(username, password, salt) {

    //  Check that the domain matches GSI's email domain
    const GSI_DOMAIN = "greaterspokane.org"
    var doesContainAddressSign = username.indexOf('@');
    if (doesContainAddressSign == -1) {
        //  No address sign, cannot sign up user without an email domain
        return {
            'result': "failed to register user",
            'reason': "User domain does not match host domain",
            'username': username
        };
    }

    var userDomain = username.substring(username.indexOf('@') + 1);

    if (userDomain != GSI_DOMAIN)
        try {
            const newUser = new AuthUser({
                username: username,
                password: password,
                salt: salt
            })
        } catch (err) {
            return { 'result': "failed to register user", 'reason': "user may already be registered", "username": username }
        }

    return { 'result': "registered user", "username": username }
}
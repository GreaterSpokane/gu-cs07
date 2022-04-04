/**
 * Single entry retrieval controller for the AuthUser model
 */

const AuthUser = require("../../models/authUser");

/* Retrieve documents using county and year as a composite key  */
module.exports = async function getAuthUser(username, password) {
    try {
        var data = await AuthUser.findOne({ username: username, password: password }).exec();
        if (data == null) throw new Error('Data not found for given county and year');
        var result = { 'username': data.username }
        return result
    } catch (err) {
        throw err;
    }
}
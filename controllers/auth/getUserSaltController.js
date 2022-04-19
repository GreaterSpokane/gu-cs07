const AuthUser = require("../../models/authUser");

module.exports = async function getUserSalt(username) {
    var data = await AuthUser.findOne({ 'username': username }).exec();
    if (data == null)
        return { 'result': 'user does not exist' };
    var result = { 'salt': data.salt };
    return result;
}
const AuthUser = require("../../models/authUser");

module.exports = function getUserSalt(username) {
    var data = AuthUser.findOne({ username: username }).exec();
    if (data == null)
        return { 'result': 'user already exists' };
    return { 'salt': data.salt };
}
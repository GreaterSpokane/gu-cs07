const mongoose = require("mongoose");

const AuthUser = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('AuthUser', AuthUser);
var express = require("express");
var router = express.Router();
var crypto = require('crypto');
var createAuthUser = require("../controllers/auth/createAuthUserController");
var authorizeUser = require("../controllers/auth/authorizeUserController");

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

/* login page api routes*/
router
    .get('/login', async(req, res, next) => { res.render('login'); })
    .get('/auth', async(req, res, next) => { res.render('auth.pug'); })
    .post('/login', async(req, res, next) => {
        //  If password match -> redirect to /auth
        //  else -> display error on login page

        //  validate body and params (nonnull, type specific)
        var username = req.body.username;
        var password = req.body.password;
        var authResult = await authorizeUser(username, password);
        res.status(201).redirect("/auth");
    })
    .post("/register/user/", async(req, res, next) => {
        if (req.body != null)
            res.err

        var username = req.body.username;
        var password = req.body.password;
        console.log(username);
        console.log(password)
        var createResult = await createAuthUser(username, password)
            .catch((err) => {
                //  Error in creating the user, redirect to the login page
                console.log(err);
                res.redirect('/login');
            });
        res.status(201).json(createResult);
    });

module.exports = router;
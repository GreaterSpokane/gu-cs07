require('dotenv').config();
var express = require("express");
var session = require("express-session");
var nodemailer = require('nodemailer');
var createAuthUser = require("../controllers/auth/createAuthUserController");
var authorizeUser = require("../controllers/auth/authorizeUserController");
const AuthUser = require('../models/authUser');
var { saltHashPassword } = require("../controllers/auth/hashController");

function validateSession(sess) {
    /**
     * Validate that the user has a valid session active when trying to login and access authorized pages
     */
    if (sess) {
        if (sess.username != ("" || null || undefined)) {
            var user = AuthUser.findOne({ 'username': sess.username }).exec();
            if (user != null)
                return true;
            else
                return false;
        }
    }

    return false;
}

function validatePinSession(sess, enteredPin) {
    /**
     * Validate that the pin session is valid. The session is valid iff. 
     * - The pin is stored in the session variables
     * - The pin sent time is stored in the session variables
     * - The email to change the password for is stored in the session variables
     * - The pin the user entered is the same as the stored pin
     * - It has not been more than three minutes since the code was sent to the user
     */
    if (sess) {
        if (
            sess.email != ("" || null || undefined) &&
            sess.pin != ("" || null || undefined) &&
            sess.pinTime != ("" || null || undefined)) {

            if (secondsSinceEpoch() - sess.pinTime >= 240)
            //  If the time difference is >= 4 minutes, invalidate the session    
                return false;
            if (sess.pin !== enteredPin)
                return false;

            return true;
        }
    }

    return false;
}

function generateRandomPIN() {
    /** 
     * Return a randomly generated 6-digit pin that the user will enter into the change password screen 
     * to verify the user's identity
     */
    var pin = "";
    var counter = 0;
    while (counter < 6) {
        pin += String(Math.floor(Math.random() * 10) + 1);
        counter++;
    }
    return Number(pin);
}

function secondsSinceEpoch() {
    /**
     * Return current date and time as seconds since 1/1/1970
     */
    var date = new Date();
    return Date.UTC(
        date.getFullYear(), date.getMonth(), date.getDate(),
        date.getHours(), date.getMinutes(), date.getSeconds());
}

var router = express.Router();
router.use(session({
    //  Session setup
    secret: process.env.USER_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        // Session expires after 5 min of inactivity.
        expires: 300000
    }
}));

router
    .get('/button', async(req, res, next) => {
        if (validateSession(req.session))
            res.render('button')
        else
            res.redirect(403, '/login')
    })
    .get('/endpoints', async(req, res, next) => {
        if (validateSession(req.session))
            res.render('auth');
        else
            res.redirect(403, '/login');
    })
    .get('/auth', async(req, res) => {
        if (validateSession(req.session))
            res.render('auth');
        else
            res.redirect(403, '/login');

    })

//  login routers
router
    .get('/login', async(req, res) => {
        req.session.destroy()
        res.render('login');
    })
    .post('/login', async(req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var sess = req.session;
        var authResult = await authorizeUser(username, password);

        if (authResult.result == "success") {
            sess.username = username;
            return res.redirect('/auth');
        } else
            return res.redirect(403, '/login');
    });

//  User registration routers
router
    .get('/register', async(req, res) => { res.render('register') })
    .post("/register", async(req, res) => {
        if (req.body == null)
            return res.redirect(400, '/register');

        var sess = req.session;
        var username = req.body.username;
        var password = req.body.password;

        var registerResult = await createAuthUser(username, password);
        if (registerResult.result == 'registered user') {
            sess.username = username
            return res.redirect(301, '/auth')
        } else {
            console.log(registerResult)
            return res.redirect(400, '/register')
        }
    });

//  Change Password routers
router
    .get('/change', async(req, res) => { res.render('changePassLogin') })
    .post('/change', async(req, res) => {
        if (req.body == null)
            return res.redirect(401, '/login');

        var sess = req.session;
        var email = req.body.email;

        //  Check that email is registered first
        var user = AuthUser.findOne({ username: req.body.email }).exec();
        if (user == (null || undefined)) {

            return res.redirect(401, )
        }


        //  Generate pin and store it as a session variable w/ its creation time
        sess.pin = generateRandomPIN();
        sess.pinTime = secondsSinceEpoch();

        var message = `Enter this code to verify your identity: ${userPin}`

        var mailOptions = {
            from: process.env.CHANGE_EMAIL,
            to: req.body.email,
            subject: 'Temporary PIN For Spokane Economic Recovery Dashboard',
            text: message
        };

        var transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.CHANGE_EMAIL,
                pass: process.env.CHANGE_EMAIL_PASSWORD
            }
        });

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.redirect(400, '/change/password');
            } else {
                console.log('Password reset email sent: ' + info.response);
                res.redirect('pin')
            }
        });
    });

//  Pin entry routers
router
    .get('/pin', async(req, res) => { res.render('verifyPin') })
    .post('/pin', async(req, res) => {
        if (req.body == null)
            return res.redirect(400, '/change');

        var sess = req.session;
        var enteredPin = req.body.pin;

        if (validatePinSession(sess, enteredPin)) {
            var password = req.body.updatedpass;
            var passwordHash = saltHashPassword(password);
            var user = AuthUser.findOneAndUpdate({ 'username': sess.email }, { $set: { password: passwordHash } }).exec();
        } else {
            return res.redirect(401, '/change');
        }
    })

module.exports = router;
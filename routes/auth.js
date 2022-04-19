require('dotenv').config();
var express = require("express");
var session = require("express-session");
var nodemailer = require('nodemailer');
var createAuthUser = require("../controllers/auth/createAuthUserController");
var authorizeUser = require("../controllers/auth/authorizeUserController");
const AuthUser = require('../models/authUser');
var router = express.Router();
//  Session setup
router.use(session({
    secret: process.env.USER_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        // Session expires after 5 min of inactivity.
        expires: 300000
    }
}));

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CHANGE_EMAIL,
        pass: process.env.CHANGE_EMAIL_PASSWORD
    }
});

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
     * Return current date and time
     */
    var date = new Date();
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
}

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
            return res.redirect('/auth')
        } else
            return res.redirect('/register')
    });

//  Change Password routers
router
    .get('/change', async(req, res) => { res.render('changePassLogin') })
    .post('/change', async(req, res) => {
        if (req.body == null)
            return res.redirect(401, '/login');

        //  Check that email is registered first

        var sess = req.session;
        var email = req.body.email;

        //  Generate pin and store it as a session variable w/ its creation time
        var userPin = generateRandomPIN();
        sess.pin = userPin;
        sess.pinTime = Date.UTC(Date.now());
        console.log(sess);

        var message = `Enter this code to verify your identity: ${userPin}`
        var mailOptions = {
            from: process.env.CHANGE_EMAIL,
            to: req.body.email,
            subject: 'Temporary PIN For Spokane Economic Recovery Dashboard',
            text: message
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.redirect(400, '/change/password');
            } else {
                console.log('Password reset email sent: ' + info.response);
                res.redirect('pinEntry')
            }
        });
    });

//  Pin entry routers
router
    .get('/pin', async(req, res) => { res.render('verifyPin') })
    .post('/pin', async(req, res) => {
        var sess = req.session;

    })

module.exports = router;
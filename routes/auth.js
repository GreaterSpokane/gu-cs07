require('dotenv').config();
var express = require("express");
var session = require("express-session");
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

function validateSession(sess) {
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


module.exports = router;
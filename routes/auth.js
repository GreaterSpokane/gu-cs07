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

router
    .get('/auth', async(req, res) => {
        // if (req.session.username != (null || undefined)) {
        //     res.render('auth');
        // } else {
        //     res.redirect(403, '/login');
        // }

        res.render('auth');
    })

router
    .get('/login', async(req, res) => { res.render('login') })
    .post('/login', async(req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var authResult = await authorizeUser(username, password);

        if (authResult.result == "success")
        //req.session.username = username   
            return res.redirect('/auth');
        else
            return res.redirect('/login');
    });

router
    .get('/register', async(req, res) => { res.render('register') })
    .post("/register", async(req, res) => {
        if (req.body == null)
            return res.redirect(400, '/login');

        var username = req.body.username;
        var password = req.body.password;
        var registerResult = await createAuthUser(username, password);

        if (registerResult.result == 'registered user')
            return res.redirect('/auth')
        else
            return res.redirect('/auth')
    });


module.exports = router;
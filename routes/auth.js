require('dotenv').config();
var express = require("express");
var session = require("express-session");
var router = express.Router();
var createAuthUser = require("../controllers/auth/createAuthUserController");
var authorizeUser = require("../controllers/auth/authorizeUserController");

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

/* login page api routes*/
router
    .get('/login/', async(req, res) => {
        req.session.destroy();
        res.render('login')
    })
    .get('/auth/', async(req, res) => {
        if (req.session.username != (null || undefined))
            res.render('auth');
        else
            res.redirect(403, '/login/');
    })
    .post('/login/', async(req, res) => {
        //  validate body and params (nonnull, type specific)
        if (req.body == null) {
            res.redirect(400, '/login/');
            return;
        }

        var username = req.body.username;
        var password = req.body.password;
        var authResult = await authorizeUser(username, password);

        if (authResult.result == "success") {
            req.session.username = username
            res.redirect(301, "/auth/");
            return
        } else {
            req.session.destroy();
            res.redirect(401, "/login/");
            return
        }
    })
    .get('/register/', async(req, res) => { res.render('register') })
    .post("/register/", async(req, res) => {
        if (req.body == null) {
            req.session.destroy();
            res.redirect(400, '/login/');
            return;
        }

        var username = req.body.username;
        var password = req.body.password;
        var createResult = await createAuthUser(username, password)
            .catch((err) => {
                req.session.destroy();
                res.redirect('/login/');
                return;
            });

        req.session.username = username;
        res.redirect(201, '/auth/');
    });

module.exports = router;
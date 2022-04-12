var express = require("express");
var router = express.Router();
var createAuthUser = require("../controllers/auth/createAuthUserController");
var authorizeUser = require("../controllers/auth/authorizeUserController");

/* login page api routes*/
router
    .get('/login', async(req, res, next) => { res.render('login'); })
    .get('/auth', async(req, res, next) => { res.render('button'); })
    .get('/button', async(req, res, next) => { res.render('button'); })
    .get('/endpoints', async(req, res, next) => { res.render('auth'); })
    .post('/login', async(req, res, next) => {
        //  If password match -> redirect to /auth
        //  else -> display error on login page

        //  validate body and params (nonnull, type specific)
        var username = req.body.username;
        var password = req.body.password;
        var authResult = await authorizeUser(username, password);

        if (authResult.result == "success") {
            console.log(authResult);
            res.redirect(301, "/auth_layout");
        } else {
            console.log(authResult);
            res.redirect(401, "/login");
        }
    })
    .post("/register/user/", async(req, res, next) => {
        if (req.body != null)
            res.redirect(400, '/login')

        var username = req.body.username;
        var password = req.body.password;
        var createResult = await createAuthUser(username, password)
            .catch((err) => {
                //  Error in creating the user, redirect to the login page
                console.log(err);
                res.redirect('/login');
            });
        res.status(201).json(createResult);
    });

module.exports = router;
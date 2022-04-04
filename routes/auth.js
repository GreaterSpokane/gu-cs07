var express = require("express");
var router = express.Router();

/* login page api routes*/
router
    .get('/login', async(req, res, next) => {
        res.render('login');
    })
    .post('/login', async(req, res, next) => {


        //  If password match -> redirect to /auth
        //  else -> display error on login page
        res.status(201, { 'Password': req.body });
    })
    .get('/auth', async(req, res, next) => {
        res.render('auth.pug');
    })
    .post("/register/user/", async(req, res, next) => {
        if (req.body != null)
            res.err

        //  if user is not in the same gsi domain -> redirect to login page with error message
    })

module.exports = router;
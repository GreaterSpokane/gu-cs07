var express = require("express");
var router = express.Router();

/* GET auth login page */
router.get('/login', (req, res, next) => {
    res.render('login');
}).post('/login', (req, res, next) => {
    if (req.body.password != process.env.AUTH_PASS)
        res.status(401).json({ 'result': 1, 'message': "Invalid password" })
    else if (
        req.body.username != process.env.AUTH_USER ||
        req.body.password != process.env.AUTH_PASS
    )
        res.status(401).json({ 'result': 1, 'message': "Invalid credentials" }).render('login')
    else if (
        req.body.username == process.env.AUTH_USER ||
        req.body.password == process.env.AUTH_PASS
    ) {
        res.append('result', "0").render('auth');
    } else
        res.status(401).json({ "result": 1, "message": "Unknown error" })

})

/* GET auth page */
router.get('/auth', (req, res, next) => {
    res.render('login');
})

module.exports = router;
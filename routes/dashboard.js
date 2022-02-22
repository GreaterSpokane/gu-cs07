var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', (req, res, next) => {
    res.render("dashboard");
});

module.exports = router;
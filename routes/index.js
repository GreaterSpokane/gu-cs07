var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render("dashboard");
    //res.render('index', { title: 'Express' }); rendering for templates
});

router.get('/index', (req, res) => {
    res.render("dashboard");
    //res.render('index', { title: 'Express' }); rendering for templates
});

router.get('/dashboard', (req, res) => {
    res.render("dashboard");
});

router.get('/about', (req, res) => {
    res.render("about");
})

module.exports = router;
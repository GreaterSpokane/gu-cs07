var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render("index");
    //res.render('index', { title: 'Express' }); rendering for templates
});

router.get('/index', (req, res, next) => {
    res.render("index");
    //res.render('index', { title: 'Express' }); rendering for templates
});

module.exports = router;
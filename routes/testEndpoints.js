var express = require('express');
var router = express.Router();

//  Health endpoint
router.get('/testing/health', (req, res, next) => {
    health = {
        'uptime': process.uptime(),
        'date': Date.now(),
        'message': 'Thanks for visiting the Spokane Economic Dashboard!'
    }
    res.json(health);
});

module.exports = router;
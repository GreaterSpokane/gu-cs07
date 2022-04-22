const express = require('express');
const createMedianIncome = require('../controllers/medianIncome/createMedianIncomeController');
const getMedianIncome = require('../controllers/medianIncome/getMedianIncomeController');
const getManyMedianIncome = require('../controllers/medianIncome/getManyMedianIncomeController');
const deleteMedianIncome = require('../controllers/medianIncome/deleteMedianIncomeController')
const serialize = require('../serializers/medianIncomeSerializer');
var router = express.Router();

/*  Insert new document into median income collection in db   */
router.post('/v1/newMedianIncome', async(req, res) => {
    //  Check that query string exists 
    if (
        //  Check that each parameter exists
        typeof req.query.county === "undefined" ||
        typeof req.query.state === "undefined" ||
        typeof req.query.year === "undefined" ||
        typeof req.query.median_income === "undefined") {

        var result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        };
        res.status(404).json(result);
        return;
    }

    //  Create new document in median income collection
    var entry = await createMedianIncome(
        req.query.county,
        req.query.state,
        req.query.year,
        req.query.median_income
    ).catch((err) => {
        var result = { 'result': 'Internal Error', 'error': err };
        res.status(404).json(result);
        return;
    });

    //  Compile result object with success message and new object's id
    res.status(201).json({
        'result': 'Success',
        'corr_id': entry.corr_id
    });
});

/*  get entry from median income collection in db  */
router.get('/v1/getMedianIncome', async(req, res) => {
    if (
        req.query.county === "undefined" ||
        req.query.year === "undefined"
    ) {
        //  Check that the year and county parameter exists
        var result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        };

        res.status(404).json(result);
        return;
    }

    var result = await getMedianIncome(req.query.county, req.query.year)
        .catch((err) => {
            var result = {
                'result': 'Internal error',
                'error': err
            };

            res.status(404).json(result);
            return;
        });

    res.status(200).json(result);
})

/* Get all median income documents in year range from the db */
router.get('/v1/getManyMedianIncome', async(req, res) => {
    if (
        req.query.county === "undefined" ||
        req.query.start_year === "undefined" ||
        req.query.end_year === "undefined"
    ) {
        //  Check that the year range and county parameters exist
        res.status(404).json({
            'result': 'Failure',
            'reason': 'Parameter error'
        });
        return;
    }

    var result = await getManyMedianIncome(req.query.county, req.query.start_year, req.query.end_year)
        .catch((err) => {
            res.status(404).json({
                'result': 'Internal error',
                'error': err
            });
            return;
        });

    var serializedResult = await serialize(result);
    res.status(200).json(serializedResult);
});

/* Delete median income document by correlation id */
router.delete('/v1/deleteMedianIncome', async(req, res) => {
    if (typeof req.query.corr_id === 'undefined') {
        result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        };

        res.status(404).json(result);
        return
    }

    var result = await deleteMedianIncome(req.query.corr_id)
        .catch(() => {
            return res.status(404).json({ 'result': 'Internal error' });
        });

    res.status(200).json(result);
})

module.exports = router;
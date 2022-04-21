const express = require('express');
const createAverageRent = require('../controllers/averageRent/createAverageRentController');
const getAverageRent = require('../controllers/averageRent/getAverageRentController');
const getManyAverageRent = require('../controllers/averageRent/getManyAverageRentController');
const deleteAverageRent = require('../controllers/averageRent/deleteAverageRentController')
const serialize = require('../serializers/averageRentSerializer');
var router = express.Router();

/*  Insert new document into housing affordability index collection in db   */
router.post('/v1/newAverageRent', async(req, res) => {
    //  Check that query string exists 
    if (
        //  Check that each parameter exists
        typeof req.query.county === "undefined" ||
        typeof req.query.state === "undefined" ||
        typeof req.query.year === "undefined" ||
        typeof req.query.average_rent === "undefined") {

        var result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        };
        res.status(404).json(result);
        return;
    }

    //  Create new document in housing affordability index collection
    var entry = await createAverageRent(
        req.query.county,
        req.query.state,
        req.query.year,
        req.query.average_rent
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

/*  get entry from housing affordability index collection in db  */
router.get('/v1/getAverageRent', async(req, res) => {
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

    var result = await getAverageRent(req.query.county, req.query.year)
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

/* Get all housing affordability index documents in year range from the db */
router.get('/v1/getManyAverageRent', async(req, res) => {
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

    var result = await getManyAverageRent(req.query.county, req.query.start_year, req.query.end_year)
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

/* Delete housing affordability index document by correlation id */
router.delete('/v1/deleteAverageRent', async(req, res) => {
    if (typeof req.query.corr_id === 'undefined') {
        result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        };

        res.status(404).json(result);
        return
    }

    var result = await deleteAverageRent(req.query.corr_id)
        .catch(() => {
            return res.status(404).json({ 'result': 'Internal error' });
        });

    res.status(204).json(result);
})

module.exports = router;
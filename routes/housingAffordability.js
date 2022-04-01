const express = require('express');
const createHousingAffordability = require('../controllers/housingAffordability/createHousingAffordabilityController');
const getHousingAffordability = require('../controllers/housingAffordability/getHousingAffordabilityController');
const getManyHousingAffordability = require('../controllers/housingAffordability/getManyHousingAffordabilityController');
const deleteHousingAffordability = require('../controllers/housingAffordability/deleteHousingAffordabilityController')
const serialize = require('../serializers/housingAffordabilitySerializer');
var router = express.Router();

/*  Insert new document into housing affordability index collection in db   */
router.post('/v1/newHousingAffordability', async(req, res) => {
    //  Check that query string exists 
    if (
        //  Check that each parameter exists
        typeof req.query.county === "undefined" ||
        typeof req.query.state === "undefined" ||
        typeof req.query.year === "undefined" ||
        typeof req.query.housing_affordability === "undefined") {

        var result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        };
        res.status(404).json(result);
        return;
    }

    //  Create new document in housing affordability index collection
    var entry = await createHousingAffordability(
        req.query.county,
        req.query.state,
        req.query.year,
        req.query.housing_affordability
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
router.get('/v1/getHousingAffordability', async(req, res) => {
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

    var result = await getHousingAffordability(req.query.county, req.query.year)
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
router.get('/v1/getManyHousingAffordability', async(req, res) => {
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

    var result = await getManyHousingAffordability(req.query.county, req.query.start_year, req.query.end_year)
        .catch(() => {
            res.status(404).json({
                'result': 'Failure',
                'reason': 'Parameter error'
            });
            return;
        });

    var serializedResult = await serialize(result);
    res.status(200).json(serializedResult);
});

/* Delete housing affordability index document by correlation id */
router.delete('/v1/deleteHousingAffordability', async(req, res) => {
    //  Verification
    if (typeof req.body.corr_id === 'undefined') {
        result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        };

        res.status(404).json(result);
        return
    }

    var result = await deleteHousingAffordability(req.body.corr_id)
        .catch(() => {
            res.status(404).json({ 'result': 'Internal error' });
            return;
        });

    res.status(204).json(result);
})

module.exports = router;
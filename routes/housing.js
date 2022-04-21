const express = require('express');
const createMedianHousing = require('../controllers/medianHousing/createMedianHousingController');
const getMedianHousing = require('../controllers/medianHousing/getMedianHousingController');
const getManyMedianHousing = require('../controllers/medianHousing/getManyMedianHousingController');
const deleteMedianHousing = require('../controllers/medianHousing/deleteMedianHousingController');
const serialize = require('../serializers/medianHousingSerializer')

//  Router object for Labor Participation Rate API interactions
var router = express.Router();

/* insert new entry into median housing document in db */
router.post('/v1/newMedianHousing', async(req, res) => {
    //  Check that body params exist
    if (
        //   check each parameter exists
        typeof req.query.county === "undefined" ||
        typeof req.query.state === "undefined" ||
        typeof req.query.year === "undefined" ||
        typeof req.query.med_housing_cost === "undefined") {

        var result = {
            'result': 'Parameter error',
            'body': req.query,
            'corr_id': null
        };

        res.status(404).json(result);
        return;
    }

    //  Create new entry in median housing cost document
    var entry = await createMedianHousing(
        req.query.county,
        req.query.state,
        req.query.year,
        req.query.med_housing_cost
    ).catch(() => {
        var result = {
            'result': 'Internal error',
            'corr_id': null
        };

        res.status(404).json(result);
        return;
    });

    //  Compile result object with success message and new object id
    var result = {
        'result': "Success",
        'corr_id': entry.corr_id
    }

    res.status(201).json(result);
});

/* Get single median housing document from the db using county and year as search params */
router.get('/v1/getMedianHousing', async(req, res) => {
    if (
        req.query.county === "undefined" ||
        req.query.year === "undefined"
    ) {
        //  Check that the year parameter exists
        result = {
            'result': 'Parameter error',
            'cor_id': null
        };

        res.status(404).json(result);
        return;
    }

    var result = await getMedianHousing(req.query.county, req.query.year)
        .catch((err) => {
            var result = {
                'result': 'Internal error'
            };

            res.status(404).json(result);
            return;
        });

    res.status(200).json(result);
});

/* Get multiple median housing documents from the db using county and and year range as search params */
router.get('/v1/getManyMedianHousing', async(req, res) => {
    if (
        typeof req.query.county === "undefined" ||
        typeof req.query.start_year === "undefined" ||
        typeof req.query.end_year === "undefined"
    ) {
        //  Check that the year parameter exists
        result = {
            'result': 'Parameter error'
        };

        res.status(404).json(result);
        return;
    }

    var result = await getManyMedianHousing(req.query.county, req.query.start_year, req.query.end_year)
        .catch((err) => {
            var result = {
                'result': 'Internal error'
            };

            res.status(404).json(result);
            return;
        });

    var serializedResult = await serialize(result);
    res.status(200).json(serializedResult);
});

/* Delete a document from the database using a corr_id */
router.delete('/v1/deleteMedianHousing', async(req, res) => {
    if (typeof req.query.corr_id === 'undefined') {
        result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        }

        res.status(404).json(result);
        return
    }

    var result = await deleteMedianHousing(req.query.corr_id)
        .catch(() => {
            return res.status(404).json({ 'result': 'Internal error' });
        });

    res.status(204).json(result);
});

module.exports = router;
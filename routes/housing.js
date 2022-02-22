const express = require('express');
const createMedianHousing = require('../controllers/medianHousing/createMedianHousingController');
const getMedianHousing = require('../controllers/medianHousing/getMedianHousingController')
const deleteMedianHousing = require('../controllers/medianHousing/deleteMedianHousingController')
var router = express.Router();

/* insert new entry into median housing document in db */
router.post('/v1/newMedianHousing', async(req, res) => {
    //  Check that body params exist
    if (
        //   check each parameter exists
        typeof req.body.county === "undefined" ||
        typeof req.body.state === "undefined" ||
        typeof req.body.year === "undefined" ||
        typeof req.body.med_housing_cost === "undefined") {

        var result = {
            'result': 'Parameter error',
            'body': req.body,
            'corr_id': null
        };

        res.status(404).json(result);
        return;
    }

    //  Create new entry in median housing cost document
    var entry = await createMedianHousing(
        req.body.county,
        req.body.state,
        req.body.year,
        req.body.med_housing_cost
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
        'corr_id': entry.newId
    }

    res.status(201).json(result);
});

router.get('/v1/getMedianHousing', async(req, res) => {
    if (
        typeof req.body.county === "undefined" ||
        typeof req.body.year === "undefined"
    ) {
        //  Check that the year parameter exists
        result = {
            'result': 'Parameter error',
            'cor_id': null
        };

        res.status(404).json(result);
        return;
    }

    var result = await getMedianHousing(req.body.county, req.body.year)
        .catch((err) => {
            var result = {
                'result': 'Internal error',
                'corr_id': null
            };

            res.status(404).json(result);
            return;
        });

    res.status(200).json(result);
})

router.delete('/v1/deleteMedianHousing', async(req, res) => {
    if (typeof req.body.corr_id === 'undefined') {
        result = {
            'result': 'Failure',
            'reason': 'Parameter error',
            'corr_id': null
        }

        res.status(404).json(result);
        return
    }

    var result = await deleteMedianHousing(req.body.corr_id)
        .catch((err) => {
            var result = {
                'result': 'Internal error',
                'corr_id': null
            };

            res.status(404).json(result);
            return;
        });

    res.status(204).json(result);
})

module.exports = router;
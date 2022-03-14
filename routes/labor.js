const express = require('express');
const createLabor = require('../controllers/laborParticipation/createLaborController');
const getLabor = require('../controllers/laborParticipation/getLaborController');
const getManyLabor = require('../controllers/laborParticipation/getManyLaborController');
const deleteLabor = require('../controllers/laborParticipation/deleteLaborController')
const serialize = require('../serializers/laborSerializer');
var router = express.Router();

/*  insert new entry into labor document in db   */
router.post('/v1/newLabor', async(req, res) => {
    //  Check that body parms exists 
    if (
        //  Check that each parameter exists
        typeof req.body.county === "undefined" ||
        typeof req.body.state === "undefined" ||
        typeof req.body.year === "undefined" ||
        typeof req.body.labor_force === "undefined" ||
        typeof req.body.labor_rate === "undefined") {

        var result = {
            'result': 'Parameter error',
            'body': req.body,
            'corr_id': null
        };

        res.status(404).json(result);
        return;
    }

    //  Create new entry in labor force participation rate document
    var entry = await createLabor(
        req.body.county,
        req.body.state,
        req.body.year,
        req.body.labor_force,
        req.body.labor_rate
    ).catch((err) => {
        var result = {
            'result': 'Internal error',
            'error': err
        };

        res.status(404).json(result);
        return;
    });

    //  Compile result object with success message and new object's id
    console.log(entry)
    console.log(entry.newId)
    var result = {
        'result': 'Success',
        'corr_id': entry.newId
    }

    res.status(201).json(result);
});

/*  get entry from labor document in db */
router.get('/v1/getLabor', async(req, res) => {
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

    var result = await getLabor(req.query.county, req.query.year)
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

/* Get all labor documents in year range from the db */
router.get('/v1/getManyLabor', async(req, res) => {
    if (
        req.query.county === "undefined" ||
        req.query.start_year === "undefined" ||
        req.query.end_year === "undefined"
    ) {
        //  Check that the year range parameters exist
        res.status(404).json({
            'result': 'Parameter error'
        });

        return;
    }

    var result = await getManyLabor(req.query.county, req.query.start_year, req.query.end_year)
        .catch(() => {
            res.status(404).json({ 'result': 'Internal error' });
            return;
        });

    var serializedResult = await serialize(result);
    res.status(200).json(serializedResult);
});

router.delete('/v1/deleteLabor', async(req, res) => {
    if (typeof req.body.corr_id === 'undefined') {
        result = {
            'result': 'Failure',
            'reason': 'Parameter error',
            'corr_id': null
        };

        res.status(404).json(result);
        return
    }

    var result = await deleteLabor(req.body.corr_id)
        .catch(() => {
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
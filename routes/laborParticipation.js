const express = require('express');
const createLaborParticipation = require('../controllers/laborParticipation/createLaborParticipationController');
const getLaborParticipation = require('../controllers/laborParticipation/getLaborParticipationController');
const getManyLaborParticipation = require('../controllers/laborParticipation/getManyLaborParticipationController');
const deleteLaborParticipation = require('../controllers/laborParticipation/deleteLaborParticipationController')
const serialize = require('../serializers/laborParticipationSerializer');
var router = express.Router();

/*  insert new entry into labor document in db   */
router.post('/v1/newLabor', async(req, res) => {
    //  Check that body parms exists 
    if (
        //  Check that each parameter exists
        typeof req.query.county === "undefined" ||
        typeof req.query.state === "undefined" ||
        typeof req.query.year === "undefined" ||
        typeof req.query.labor_participation === "undefined") {

        var result = {
            'result': 'Parameter error',
            'body': req.body,
            'corr_id': null
        };

        res.status(404).json(result);
        return;
    }

    //  Create new entry in labor force participation rate document
    var entry = await createLaborParticipation(
        req.query.county,
        req.query.state,
        req.query.year,
        req.query.labor_participation
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
    console.log(entry.corr_id)
    var result = {
        'result': 'Success',
        'corr_id': entry.corr_id
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

    var result = await getLaborParticipation(req.query.county, req.query.year)
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

    var result = await getManyLaborParticipation(req.query.county, req.query.start_year, req.query.end_year)
        .catch(() => {
            res.status(404).json({ 'result': 'Internal error' });
            return;
        });

    var serializedResult = await serialize(result);
    res.status(200).json(serializedResult);
});

/* Delete labor document by correlation id */
router.delete('/v1/deleteLabor', async(req, res) => {
    //  Verification
    if (typeof req.body.corr_id === 'undefined') {
        result = {
            'result': 'Failure',
            'reason': 'Parameter error',
            'corr_id': null
        };

        res.status(404).json(result);
        return
    }

    //  Call endpoint
    var result = await deleteLaborParticipation(req.body.corr_id)
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
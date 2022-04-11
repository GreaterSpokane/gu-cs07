const express = require('express');
const createNetDomesticMigration = require('../controllers/netDomesticMigration/createNetDomesticMigrationController');
const getNetDomesticMigration = require('../controllers/netDomesticMigration/getNetDomesticMigrationController');
const getManyNetDomesticMigration = require('../controllers/netDomesticMigration/getManyNetDomesticMigrationController');
//const deleteNetDomesticMigration = require('../controllers/netDomesticMigration/deleteNetDomesticMigrationController')
const serialize = require('../serializers/netDomesticMigrationSerializer');
var router = express.Router();

router
    .post('/v1/newNetDomesticMigration', async(req, res) => {
        /*  insert new entry into the labor force collection in the db   */
        if (
            //  Check that query string exists
            typeof req.query.county === "undefined" ||
            typeof req.query.state === "undefined" ||
            typeof req.query.year === "undefined" ||
            typeof req.query.net_domestic_migration === "undefined") {

            var result = {
                'result': 'Failure',
                'reason': 'Parameter Error'
            };

            res.status(400).json(result);
            return;
        }

        //  Create new entry in labor force collection
        var entry = await createNetDomesticMigration(
            req.query.county,
            req.query.state,
            req.query.year,
            req.query.net_domestic_migration
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
    })
    .get('/v1/getNetDomesticMigration', async(req, res) => {
        /*  get entry from labor participation rate collection in db  */
        if (
            req.query.county === "undefined" ||
            req.query.year === "undefined"
        ) {
            //  Check that the year parameter exists
            var result = {
                'result': 'Failure',
                'reason': 'Parameter error'
            };

            res.status(404).json(result);
            return;
        }

        var result = await getNetDomesticMigration(req.query.county, req.query.year)
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
    .get('/v1/getManyNetDomesticMigration', async(req, res) => {
        /*  get all labor documents in year range from labor force collection in db  */
        if (
            req.query.county === "undefined" ||
            req.query.start_year === "undefined" ||
            req.query.end_year === "undefined"
        ) {
            //  Check that the year range parameters exist
            res.status(404).json({ 'result': 'Parameter error' });
            return;
        }

        var result = await getManyNetDomesticMigration(req.query.county, req.query.start_year, req.query.end_year)
            .catch(() => {
                res.status(404).json({
                    'result': 'Failure',
                    'reason': 'Parameter error'
                });
                return;
            });

        var serializedResult = await serialize(result);
        res.status(200).json(serializedResult);
    })
    .delete('/v1/deleteNetDomesticMigration', async(req, res) => {
        /*  delete labor document from the collection by correlation id  */
        if (typeof req.body.corr_id === 'undefined') {
            result = {
                'result': 'Failure',
                'reason': 'Parameter error'
            };

            res.status(400).json(result);
            return;
        }

        //  TODO: Delete labor force indicator
    })

module.exports = router;
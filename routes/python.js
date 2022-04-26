var express = require("express");
var router = express.Router();


async function getPythonData(year){
    var spawn = require("child_process").spawn;

    var process = spawn('python3',["./DataGathering/REST.py",
                            year], {timeout: 20000} );
  
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        return data.toString()
    } )
}

router.post('/v1/newPythonData', async(req, res) => {
    if(
        typeof req.query.year == "undefined"){

        var result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        };
        res.status(404).json(result);
        return;
    }

    var python = await getPythonData(req.query.year).catch((err) => {
        var result = { 'result': 'Internal Error', 'error': err };
        res.status(404).json(result);
        return;
    });

    res.status(201).json({
        'result': 'Success',
        'corr_id': python
    });
})

module.exports = router;



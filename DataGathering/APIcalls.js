const { response } = require("express");
const { spawn } = require('child_process');

var datatosend;

const python = spawn('python3', ['./APIcalls.py', "MedianIncome", 2019]);

python.stdout.on('data', function(data){
    datatosend = data.toString();
    console.log(datatosend);
});



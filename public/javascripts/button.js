const {spawn} = require('child_process');

async function retriveIndicatorAPI(){
    var dataToSend;
    const python = spawn('python3', ['DataGathering/APIcalls']);

    python.stdout.on('data', function(data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });
}

function clearStaleInput() {
    $('#year-input').val("")
    $('#county-input').val("")
}

$(document).ready(async() => {
    console.log("Loaded authorized user API interaction interface");

    $("#updateButton").on('click', async() => {
        retriveIndicatorAPI();
    })
});
async function postLaborforce(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&labor_force=${value}`
    const res = await fetch('/v1/newLaborForce', + query, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        mode: "same-origin"
    })
    
}


function clearStaleInput() {
    $('#year-input').val("")
    $('#county-input').val("")
    $('#value-input').val("")
    $('#state-input').val("");
}

$(document).ready(async() => {
    console.log("Loaded authorized user API interaction interface");

    $("#LaborforceButton").on('click', async() => {
        var year, state, county, value;
        year = $('#year-input').val();
        state = $('#state-input').val();
        county = $('#county-input').val();
        value = $('#value-input').val();

        await postLaborforce(year, state, county, value);

        clearStaleInput()
    })
});
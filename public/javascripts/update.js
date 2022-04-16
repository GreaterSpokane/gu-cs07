async function postLaborforce(yearVal, stateVal, countyVal, value) {
    var query = `?county=${yearVal}&state=${stateVal}&year=${countyVal}&labor_force=${value}`
    const res = await fetch('/v1/newLaborForce' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })
    
}


function clearStaleInput() {
    $('#labor-year-input').val("")
    $('#labor-county-input').val("")
    $('#labor-value-input').val("")
    $('#labor-state-input').val("");
}

$(document).ready(async() => {
    console.log("Loaded authorized user API interaction interface");

    $("#LaborforceButton").on('click', async() => {
        var year, state, county, value;
        year = $('#labor-year-input').val();
        state = $('#labor-state-input').val();
        county = $('#labor-county-input').val();
        value = $('#labor-value-input').val();
        await postLaborforce(year, state, county, value);

        clearStaleInput()
    })
});
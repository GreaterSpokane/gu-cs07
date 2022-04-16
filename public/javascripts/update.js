async function postLaborforce(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&labor_force=${value}`
    const res = await fetch('/v1/newLaborForce' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })
    
}

async function postLaborforceParticipation(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&labor_participation=${value}`
    const res = await fetch('/v1/newLaborParticipation' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })
    
}

async function postMedian(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&labor_force=${value}`
    const res = await fetch('/v1/newMedianIncome' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })
    
}

async function postIndex(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&housing_affordability=${value}`
    const res = await fetch('/v1/newHousingAffordability' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })
    
}

async function postPrice(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&med_housing_cost=${value}`
    const res = await fetch('/v1/newMedianHousing' + query, {
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
    $('#participation-year-input').val("")
    $('#participation-county-input').val("")
    $('#participation-value-input').val("")
    $('#participation-state-input').val("");
    $('#index-year-input').val("")
    $('#index-county-input').val("")
    $('#index-value-input').val("")
    $('#index-state-input').val("");
    $('#median-year-input').val("")
    $('#median-county-input').val("")
    $('#median-value-input').val("")
    $('#median-state-input').val("");
    $('#price-year-input').val("")
    $('#price-county-input').val("")
    $('#price-value-input').val("")
    $('#price-state-input').val("");
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

    $("#ParticipationButton").on('click', async() => {
        var year, state, county, value;
        year = $('#participation-year-input').val();
        state = $('#participation-state-input').val();
        county = $('#participation-county-input').val();
        value = $('#participation-value-input').val();
        await postLaborforceParticipation(year, state, county, value);

        clearStaleInput()
    })

    $("#MedianButton").on('click', async() => {
        var year, state, county, value;
        year = $('#median-year-input').val();
        state = $('#median-state-input').val();
        county = $('#median-county-input').val();
        value = $('#median-value-input').val();
        await postMedian(year, state, county, value);

        clearStaleInput()
    })

    $("#IndexButton").on('click', async() => {
        var year, state, county, value;
        year = $('#index-year-input').val();
        state = $('#index-state-input').val();
        county = $('#index-county-input').val();
        value = $('#index-value-input').val();
        await postIndex(year, state, county, value);

        clearStaleInput()
    })

    $("#PriceButton").on('click', async() => {
        var year, state, county, value;
        year = $('#price-year-input').val();
        state = $('#price-state-input').val();
        county = $('#price-county-input').val();
        value = $('#price-value-input').val();
        await postPrice(year, state, county, value);

        clearStaleInput()
    })

});
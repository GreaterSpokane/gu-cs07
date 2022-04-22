async function postPythonData(year) {
    var query = `?year=${year}`
    const res = await fetch('/v1/newPythonData' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })
}




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
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&median_income=${value}`
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
    
async function postEmployed(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&employed=${value}`
    const res = await fetch('/v1/newEmployed' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })   
}

async function postUnemployed(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&unemployed=${value}`
    const res = await fetch('/v1/newUnemployed' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })   
}

async function postChange(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&natural_change=${value}`
    const res = await fetch('/v1/newNaturalChange' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })   
}

async function postMigration(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&net_domestic_migration=${value}`
    const res = await fetch('/v1/newNetDomesticMigration' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })   
}

async function postRent(yearVal, stateVal, countyVal, value) {
    var query = `?county=${countyVal}&state=${stateVal}&year=${yearVal}&average_rent=${value}`
    const res = await fetch('/v1/newAverageRent' + query, {
        method: 'POST',
        headers: {},
        mode: "same-origin"
    })   
}


function clearStaleInput() {
    $('#labor-year-input').val("");
    $('#labor-county-input').val("");
    $('#labor-value-input').val("");
    $('#labor-state-input').val("");
    $('#participation-year-input').val("");
    $('#participation-county-input').val("");
    $('#participation-value-input').val("");
    $('#participation-state-input').val("");
    $('#index-year-input').val("");
    $('#index-county-input').val("");
    $('#index-value-input').val("");
    $('#index-state-input').val("");
    $('#median-year-input').val("");
    $('#median-county-input').val("");
    $('#median-value-input').val("");
    $('#median-state-input').val("");
    $('#price-year-input').val("");
    $('#price-county-input').val("");
    $('#price-value-input').val("");
    $('#price-state-input').val("");
    $('#employed-year-input').val("");
    $('#employed-county-input').val("");
    $('#employed-value-input').val("");
    $('#employed-state-input').val("");
    $('#unemployed-year-input').val("");
    $('#unemployed-county-input').val("");
    $('#unemployed-value-input').val("");
    $('#unemployed-state-input').val("");
    $('#change-year-input').val("");
    $('#change-county-input').val("");
    $('#change-value-input').val("");
    $('#change-state-input').val("");
    $('#migration-year-input').val("");
    $('#migration-county-input').val("");
    $('#migration-value-input').val("");
    $('#migration-state-input').val("");
    $('#rent-year-input').val("");
    $('#rent-county-input').val("");
    $('#rent-value-input').val("");
    $('#rent-state-input').val("");
    $('#API-year-input').val("");
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

        clearStaleInput();
    })

    $("#ParticipationButton").on('click', async() => {
        var year, state, county, value;
        year = $('#participation-year-input').val();
        state = $('#participation-state-input').val();
        county = $('#participation-county-input').val();
        value = $('#participation-value-input').val();
        await postLaborforceParticipation(year, state, county, value);

        clearStaleInput();
    })

    $("#MedianButton").on('click', async() => {
        var year, state, county, value;
        year = $('#median-year-input').val();
        state = $('#median-state-input').val();
        county = $('#median-county-input').val();
        value = $('#median-value-input').val();
        await postMedian(year, state, county, value);

        clearStaleInput();
    })

    $("#IndexButton").on('click', async() => {
        var year, state, county, value;
        year = $('#index-year-input').val();
        state = $('#index-state-input').val();
        county = $('#index-county-input').val();
        value = $('#index-value-input').val();
        await postIndex(year, state, county, value);

        clearStaleInput();
    })

    $("#PriceButton").on('click', async() => {
        var year, state, county, value;
        year = $('#price-year-input').val();
        state = $('#price-state-input').val();
        county = $('#price-county-input').val();
        value = $('#price-value-input').val();
        await postPrice(year, state, county, value);

        clearStaleInput();
    })

    $("#EmployedButton").on('click', async() => {
        var year, state, county, value;
        year = $('#employed-year-input').val();
        state = $('#employed-state-input').val();
        county = $('#employed-county-input').val();
        value = $('#employed-value-input').val();
        await postEmployed(year, state, county, value);

        clearStaleInput();
    })

    $("#UnemployedButton").on('click', async() => {
        var year, state, county, value;
        year = $('#unemployed-year-input').val();
        state = $('#unemployed-state-input').val();
        county = $('#unemployed-county-input').val();
        value = $('#unemployed-value-input').val();
        await postUnemployed(year, state, county, value);

        clearStaleInput();
    })

    $("#ChangeButton").on('click', async() => {
        var year, state, county, value;
        year = $('#change-year-input').val();
        state = $('#change-state-input').val();
        county = $('#change-county-input').val();
        value = $('#change-value-input').val();
        await postChange(year, state, county, value);

        clearStaleInput();
    })

    $("#MigrationButton").on('click', async() => {
        var year, state, county, value;
        year = $('#migration-year-input').val();
        state = $('#migration-state-input').val();
        county = $('#migration-county-input').val();
        value = $('#migration-value-input').val();
        await postMigration(year, state, county, value);

        clearStaleInput();
    })

    $("#RentButton").on('click', async() => {
        var year, state, county, value;
        year = $('#rent-year-input').val();
        state = $('#rent-state-input').val();
        county = $('#rent-county-input').val();
        value = $('#rent-value-input').val();
        await postRent(year, state, county, value);

        clearStaleInput();
    })

    $("#updateButton").on('click', async() =>{
        var year;
        year = $('#API-year-input').val();
        console.log(year);
        await postPythonData(year);

        clearStaleInput();
    })

});
async function getHealth() {
    const res = await fetch('/testing/health', {
            method: 'GET',
            mode: "same-origin"
        })
        .then(res => res.json())
        .then(body => $("#response-window").val(JSON.stringify(body, null, 2)));
}

async function getSingleLaborEntry(year, county) {
    const query = { "county": county, "year": year }
    const res = await fetch('/v1/getLabor', {
            method: 'GET',
            mode: "same-origin",
            body: JSON.stringify(query)
        })
        .then(res => res.json())
        .then(body => $("#response-window").val(JSON.stringify(body, null, 2)));
}

$(document).ready(async() => {
    console.log("Loaded authorized user API interaction interface");
    await getHealth(); //  Get the health data of the site and display it in the output body

    $("#execute-query").on('click', async() => {
        var method, endpoint, year, county;
        var checkedRadial = $("#http-method-options").child("input[type='radio']").prop('checked', true)
        console.log(checkedRadial)
    })
});
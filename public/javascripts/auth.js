async function getHealth() {
    const res = await fetch('/health', {
            method: 'GET',
            mode: "same-origin"
        })
        .then(res => res.json())
        .then(body => $("#response-window").val(JSON.stringify(body, null, 2)));
}

async function getSingleLaborEntry(year, county) {
    const query = `?county=${county}&year=${year}`
    const res = await fetch("/v1/getLabor/" + query, {
            method: 'GET',
            headers: {},
            mode: "same-origin"
        })
        .then(res => res.json())
        .then(body => $("#response-window").val(JSON.stringify(body, null, 2)));
}

function clearStaleInput() {
    $('#year-input').val("")
    $('#county-input').val("")
}

$(document).ready(async() => {
    console.log("Loaded authorized user API interaction interface");
    await getHealth(); //  Get the health data of the site and display it in the output body

    $("#execute-query").on('click', async() => {
        var method, endpoint, year, county;
        method = $("input[name='http-method-selector']:checked").val();
        endpoint = $("input[name='indicator-selector']:checked").val();
        year = $('#year-input').val()
        county = $('#county-input').val()

        if (method === 'get-single') {
            getSingleLaborEntry(year, county);
        } else if (method === 'get-multiple') {
            //  todo
        } else if (method === 'post') {
            //  todo
        } else if (method === 'delete') {
            //  todo
        } else {
            $("#response-window").val("No HTTP method selected")
        }

        clearStaleInput()
    })
});
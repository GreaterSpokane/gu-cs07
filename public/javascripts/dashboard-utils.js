import indicatorConfig from './indicator-config.js';

window.onload = async function () {
    const counties = ["Spokane", "Boise", "Salt Lake City", "Eugene", "Fort Collins"]
    for (const indicatorName of Object.keys(indicatorConfig)) {
        for (const county of counties) {
            console.log("calling", indicatorName, county)
            const response = await callData(indicatorName, county)
            console.log("response:", response)
            indicatorConfig[indicatorName][county.split(' ').join('').toLowerCase()] = response;
        }
        // snapshot charts
        console.log("CREATING CHART FOR:", indicatorName)
        console.log("WITH CONFIG:", getConfig(indicatorName, false))
        new Chart(indicatorName, getConfig(indicatorName, false));

        // descriptions, ect.
        document.getElementById(indicatorName + "-description").innerText = indicatorConfig[indicatorName]["description"];
        document.getElementById(indicatorName + "-about").innerText = indicatorConfig[indicatorName]["note"];
        document.getElementById(indicatorName + "-link").setAttribute("href", indicatorConfig[indicatorName]["link"]);

        // detailed charts
        indicatorConfig[indicatorName]["detailchart"] = new Chart(indicatorName + "-detailed-chart-canvas", getConfig(indicatorName, true))

        // range sliders
        const yearRange = getData(indicatorName, "spokane", true)
        // const startYear = Number(yearRange[yearRange.length - indicatorConfig[indicatorName]["initialNumIntervals"] - 1]);
        const startYear = Number(yearRange[0]);
        const endYear = Number(yearRange[yearRange.length - 1]);
        const sliderElement = document.getElementById(indicatorName + "-slider")
        try {
            indicatorConfig[indicatorName]["rangeslider"] = noUiSlider.create(sliderElement, {
                start: [startYear, endYear],
                connect: true,
                step: 1,
                range: {
                    'min': startYear,
                    'max': endYear
                },
                margin: 1,
                tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })]
            });
            indicatorConfig[indicatorName]["rangeslider"].on("change", function (values) {
                let startIndex = yearRange.indexOf(String(Math.trunc(values[0])));
                let endIndex = yearRange.indexOf(String(Math.trunc(values[1])));
                updateRange(indicatorName, startIndex, endIndex);
            });
        } catch (error) {
            console.log(error)
        }

    }
    console.log(indicatorConfig)

    // temp for employment/unemployement
    new Chart("lfs", getConfig("lfs", true));

    // adds event listeners to each button
    var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            let indicatorName = String(this.id).slice(0, 3);
            console.log(indicatorName)
            let detailedViews = document.getElementsByClassName("detailed-view-card");
            for (let i = 0; i < detailedViews.length; i++) {
                if (detailedViews[i].style.maxHeight) {
                    detailedViews[i].style.maxHeight = null;
                    setTimeout(function () {    // waiting for css transition to finish
                        detailedViews[i].style.display = "none";
                    }, 200);
                } else {
                    if (String(detailedViews[i].id).slice(0, 3) == indicatorName) {
                        detailedViews[i].style.display = "flex";
                        detailedViews[i].style.maxHeight = detailedViews[i].scrollHeight + "px";
                    }
                }
            }
        });
    }

    // create the short stat percentage for each card
    const stats = document.getElementsByClassName("stat");
    for (var i = 0; i < stats.length; i++) {
        console.log("inside short stat fucntion")
        let indicatorName = String(stats[i].id).slice(0, 3);
        console.log("stat sliced", indicatorName)
        const spokaneStatData = getData(indicatorName, 'spokane', false)
        const yearsData = getData(indicatorName, 'spokane', true)
        const dataLen = spokaneStatData.length
        const endData = spokaneStatData[dataLen - 1]
        const startData = spokaneStatData[dataLen - 2]
        const statPercent = (((endData - startData) / startData) * 100).toFixed(1)
        const endYear = yearsData[dataLen - 1]
        const startYear = yearsData[dataLen - 2]
        let incOrDec = 'increased'
        if (statPercent < 0) {
            incOrDec = 'decreased'
        }
        if (indicatorName == "lfs") {
            stats[i].innerHTML = `Spokane county in ${endYear}`
        } else {
            // TODO: Maybe Spokane county be added to each indicator card or at a note at the top saying all stats are from spokane?
            stats[i].innerHTML = `Spokane county ${incOrDec} ${Math.abs(statPercent)}% from ${startYear} to ${endYear}`;
        }

    }

    // add event listeners to checkboxes
    var checkboxes = document.getElementsByClassName("checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", function () {
            const indicatorName = String(this.id).slice(0, 3);
            const countyLabel = this.parentElement.innerText.split(",")[0];
            console.log("countyLabel:", countyLabel)
            if (this.checked) {
                console.log("Checkbox is now checked...");
                toggleLocations(indicatorName, countyLabel, true);

            } else {
                console.log("Checkbox is now unckecked...");
                toggleLocations(indicatorName, countyLabel, false);
            }
        })
    }

}

// updates the charts based on the range slider
function updateRange(indicatorName, startIndex, endIndex) {
    console.log("start/end indexes:", startIndex, endIndex);
    let backupData = []
    const backupLabels = JSON.parse(JSON.stringify(indicatorConfig[indicatorName].detailchart.data.labels)); // deep copy
    indicatorConfig[indicatorName].detailchart.data.labels = backupLabels.slice(startIndex, endIndex + 1);

    indicatorConfig[indicatorName].detailchart.data.datasets.forEach((dataset) => {
        backupData.push(JSON.parse(JSON.stringify(dataset.data)));
        dataset.data = dataset.data.slice(startIndex, endIndex + 1);
    });
    indicatorConfig[indicatorName].detailchart.update();

    // reset values
    indicatorConfig[indicatorName].detailchart.data.labels = JSON.parse(JSON.stringify(backupLabels));
    backupData.reverse();
    indicatorConfig[indicatorName].detailchart.data.datasets.forEach((dataset) => {
        dataset.data = JSON.parse(JSON.stringify(backupData.pop()));
    });
}

// updates the locations shown in the detailed view based on the checkboxs
function toggleLocations(indicatorName, labelText, isChecked) {
    indicatorConfig[indicatorName]["detailchart"]["data"]["datasets"].forEach((dataset) => {
        if (dataset.label == labelText) {
            if (isChecked) {
                console.log("adding data: " + labelText);
                dataset.hidden = false;
            }
            else {
                console.log("removing data: " + labelText);
                dataset.hidden = true;
            }
        }
    });
    indicatorConfig[indicatorName]["detailchart"].update();
    document.getElementById(indicatorName + "-slider").noUiSlider.reset();
}

// makes database call for specified indicator and return data and years
async function callData(indicatorName, county) {
    console.log("in func callData: calling", indicatorName)
    let path = "";
    let schemaDataName = "";
    const currentYear = new Date().getFullYear();
    const query = `?county=${county}&start_year=${currentYear - 15}&end_year=${currentYear}`;
    switch (indicatorName) {
        case 'mhc':
            path = '/v1/getManyMedianHousing/';
            schemaDataName = 'medianHousingCost';
            break;
        case 'mmr':
            path = '/v1/getManyAverageRent/';
            schemaDataName = 'averageRent';
            break;
        case 'hai':
            path = '/v1/getManyHousingAffordability/';
            schemaDataName = 'averageRent';
            break;
        case 'lfp':
            path = '/v1/getManyLaborParticipation/';
            schemaDataName = 'laborParticipationRate';
            break;
        case 'lft':
            path = '/v1/getManyLaborForce/';
            schemaDataName = 'laborForce';
            break;
        case 'ntc':
            path = '/v1/getManyNaturalChange/';
            schemaDataName = 'naturalChange';
            break;
        case 'ndm':
            path = '/v1/getManyNetDomesticMigration/';
            schemaDataName = 'netDomesticMigration';
            break;
        case 'mhi':
            path = '/v1/getManyMedianIncome/';
            schemaDataName = 'medianIncome';
            break;
        case 'emp':
            path = '/v1/getManyEmployed/'
            schemaDataName = 'employed';
            break;
        case 'uem':
            path = '/v1/getManyUnemployed/'
            schemaDataName = 'unemployed';
            break;
        default:
            console.error(`No matching endpoint for indicator: ${indicatorName}`);
            return [[], []];
    }
    const res = await fetch(path + query, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: "same-origin"
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not OK");
            }
            return res.json();
        })
        .then(body => {
            console.log("success for", indicatorName, county)
            // console.log(body)
            return body;
        })
        .catch(error => {
            console.error("Error with fetch operation for " + indicatorName, error);
        });

    try {
        if (res["years"].length < 3) {
            throw "Not enough data in database, returning empty list..."
        }
        return [res["years"], res[schemaDataName]];
    } catch (error) {
        console.log("no data in database for", indicatorName, county, "Returning empty list");
        return [[], []]
    }
}

function getData(indicatorName, county, isYearsData) {
    try {
        const dataArray = indicatorConfig[indicatorName][county];
        if (isYearsData) {
            return dataArray[0];
        } else {
            return dataArray[1];
        }
    } catch (error) {
        console.error("cant find data for", indicatorName, county, "in getData")
        return [];
    }
}

// returns the chartjs config for each indicator
function getConfig(indicatorName, isDetailView) {
    const blueColor = "#00B4ED"; //gsi blue
    const purpleColor = "#866BAF"; // gsi purple
    const yellowColor = "#D7DC61";    // gsi yellow
    const greyColor = "#6E7277";   //gsi gray
    const darkerGreyColor = '#55585c'
    const orangeColor = '#db6140';  // orange from initial syling
    const greenColor = '#719a45'    // green from initial stying
    const blackColor = '#000000'

    // temp until add employment/unemployment
    if (indicatorName == "lfs") {
        return {
            type: "doughnut",
            data: {
                labels: [
                    'Employed',
                    'Unemployed',
                    'Not in Labor Force / Other'
                ],
                datasets: [{
                    data: [0.5, 0.1, 0.4,],
                    backgroundColor: [
                        '#866BAF',
                        '#00B4ED',
                        '#6E7277',
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                radius: "80%"
            }
        }
    }


    const lineChartTemplate = {
        type: "line",
        data: {
            labels: getData(indicatorName, "spokane", true),
            datasets: [{
                data: getData(indicatorName, "spokane", false),
                borderColor: blueColor,
                fill: true,
                label: "Spokane County",
                borderWidth: 4,
                pointRadius: 2
            }, {
                data: getData(indicatorName, "boise", false),
                borderColor: purpleColor,
                label: "Boise, ID (Ada County)",
                borderWidth: 2,
                pointRadius: 2
            }, {
                data: getData(indicatorName, "saltlakecity", false),
                borderColor: greyColor,
                label: "Salt Lake City, UT (Salt Lake County)",
                borderWidth: 2,
                pointRadius: 2
            }, {
                data: getData(indicatorName, "eugene", false),
                borderColor: yellowColor,
                label: "Eugene, OR (Lane County)",
                borderWidth: 2,
                pointRadius: 2
            }, {
                data: getData(indicatorName, "fortcollins", false),
                borderColor: darkerGreyColor,
                label: "Fort Collins, CO (Larimer County)",
                borderWidth: 2,
                pointRadius: 2
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
        }

    }
    //options: indicatorConfig[indicatorName]["chartConfig"]
    // options: {
    //     maintainAspectRatio: false,
    // }

    // TODO: take countiesFirstVisible attribute from config and hide show appropriate ones for detailed or \
    // slice/delete unused ones from snapshot. Then check/uncheck checkboxes to match
    const templateDatasets = lineChartTemplate.data.datasets;
    if (isDetailView) {
        templateDatasets.forEach(dataset => {
            // dataset["hidden"] = 

        });
    } else {
        lineChartTemplate.data.datasets = templateDatasets.slice(0, 3);
    }
    return lineChartTemplate;


}
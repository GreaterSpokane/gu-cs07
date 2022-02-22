
// hides/shows cards based on what categorie (eg. housing) is selected 
function filtercards(event, tabName) {
    console.log("filter cards!");
    //toggle active tab color
    var cards = document.getElementsByClassName("card")
    var i;
    for (i = 0; i < cards.length; i++) {
        cards[i].style.display = "none";
    }
    var tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    var selectedCards = document.getElementsByClassName(tabName)
    for (i = 0; i < selectedCards.length; i++) {
        selectedCards[i].style.display = "block";
    }

    event.currentTarget.className += " active";

}

// returns the full name of the indicator abbreviation
function getIndicatorName(indicatorAbbrev) {
    names = {
        'mhi': "Median Household Income",
        'lfpr': "Labor Force Participation Rate",
        'hai': "Housing Affordability Index",
        'mhrv': "Median Home Resale Value",
    }
    return names[indicatorAbbrev]
}

function renderDetailChart(detailChart, indicatorName) {
    console.log("inside renderDetailChart");
    // var oldDetailedChartElement = document.getElementById('detailed-chart-canvas'); 
    // if (oldDetailedChartElement) {
    //     oldDetailedChartElement.remove()
    // }

    let detailChartCtx = document.getElementById("detailed-chart-canvas").getContext("2d");
    detailChart = new Chart(detailChartCtx, getConfig(indicatorName, true));
    console.log("end of renderDetailChart");


    // already commented: document.getElementById('detailed-chart-canvas').remove()
    // already commented: document.getElementsByClassName('detailed-view-half')[0].appendChild(document.createElement("canvas id='detailed-view-half'"))
    // var oldDetailedChartElement = document.getElementById('detailed-chart-canvas'); // this is my <canvas> element
    // if (oldDetailedChartElement) {
    //     oldDetailedChartElement.remove()
    // }
    // var newDetailedChartElement = document.createElement("canvas");
    // newDetailedChartElement.setAttribute("id", "detailed-chart-canvas");
    // document.getElementById('detail-graph-container').appendChild(newDetailedChartElement);
    // var detailChartObj;
    // var canvasID;
    // switch (indicatorName) {
    //     case "mhi":
    //         console.log("inside case:", indicatorName);
    //         detailChartObj = renderMhi(canvasID);
    //         break;
    //     case "lfpr":
    //         console.log("inside case:", indicatorName);
    //         detailChartObj = renderLfpr(canvasID);
    //         break;
    //     case "hai":
    //         console.log("inside case:", indicatorName);
    //         detailChartObj = renderHai(canvasID);
    //         break;
    //     case "mhrv":
    //         console.log("inside case:", indicatorName);
    //         detailChartObj = renderMhrv(canvasID);
    //         break;
    //     default:
    //         console.log("No indicaor matches", indicatorName)
    // }
    // return [detailChartObj, indicatorName];
}

// hiddes/shows data in detailed chart based on checkbox - NOT WORKING
function changeData(detailChart, labelText, isChecked) {
    console.log("inside changeData function");

    detailChart.data.datasets.array.forEach(dataset => {
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
    detailChart.update();

    // var newData = getData(indicatorName, labelText);
    // var newDataset = {
    //     data: newData,
    //     label: labelText
    // }
    // if (isChecked) {
    //     // add data
    //     console.log("adding data")
    //     chart.data.datasets.push(newDataset)
    // }
    // else {
    //     // remove data
    //     console.log("removing data")
    // }
    // chart.update()

}

window.onload = function () {
    console.log("inside window.onload fuction!");

    // render each indicator chart
    let maiChart = new Chart("mhi", getConfig("mhi", false));
    let lfprChart = new Chart("lfpr", getConfig("lfpr", false));
    let haiChart = new Chart("hai", getConfig("hai", false));
    let mhrvChart = new Chart("mhrv", getConfig("mhrv", false));
    let detailChart;

    // adds event listeners to each card
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function () {
            // render the detailed view
            let cardId = String(this.id);
            renderDetailChart(detailChart, cardId.slice(0, -5));

            // display detailed view
            this.classList.toggle("active");
            var detailedView = document.getElementById("detailed-view-card")
            //add content to detailed view here, identifuing what to put by card[i]
            if (detailedView.style.maxHeight) {
                detailedView.style.maxHeight = null;
            } else {
                detailedView.style.maxHeight = detailedView.scrollHeight + "px";
            }
        });
    }

    // add event listeners to checkboxes
    var checkboxes = document.getElementsByClassName("checkboxes");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", function () {
            var labelText = document.getElementById(this.id + "-label").textContent;
            if (this.checked) {
                console.log("Checkbox is checked..");
                changeData(detailChart, labelText, true);

            } else {
                console.log("Checkbox is not checked..");
                changeData(detailChart, labelText, false);
            }
        })
    }


}

// returns the temp data for each indicator
function getData(indicatorName, key) {
    const tempdata = {
        "act": {
            "years": [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
            "Spokane": [20.2, 20.3, 21.4, 21.5, 21.2, 20.8, 21.5, 20.8, 21.1, 21.5, 21.3, 22.2, 21.3, 21.3, 23],
            "Washington": [24.7, 25.2, 25.3, 25.5, 25.9, 25.1, 25.5, 26, 25.7, 26.8, 27.1, 27.8, 27.9, 28.4, 28.8],
            "United States": [25.1, 25, 25.3, 25.5, 25.1, 25.3, 25.5, 25.7, 25.5, 26, 26.4, 26.6, 26.9, 27.1, 27.6],
            "Salt Lake City": [21, 20, 23, 24, 23, 24, 26, 24, 26, 24, 27, 25, 28, 24, 28],
            "Boise": [24, 23, 22, 24, 25, 26, 24, 23, 26, 23, 22, 24, 23, 23, 26]
        },
        "hai": {
            "years": ["2017-Q2", "2017-Q3", "2017-Q4", "2018-Q1", "2018-Q2", "2018-Q3", "2018-Q4", "2019-Q1", "2019-Q2",
                "2019-Q3", "2019-Q4", "2020-Q1", "2020-Q2", "2020-Q3", "2020-Q4", "2021-Q1", "2021-Q2"],
            "Spokane": [120, 119.2, 124.9, 119, 101.2, 100.3, 102.3, 107.8, 101, 107, 107.2, 109, 101, 104.3, 104.7, 100, 91],
            "Washington": [120, 119.2, 124.9, 119, 101.2, 100.3, 102.3, 107.8, 101, 107, 107.2, 109, 101, 104.3, 104.7, 100, 91],
            "Salt Lake City": [123, 115.2, 126.9, 115, 103.2, 104.3, 106.3, 108.8, 105, 107, 106.2, 109, 104, 104.3, 107.7, 103, 91],
            "Boise": [123, 116.2, 123.9, 117, 102.2, 101.3, 107.3, 102.8, 104, 106, 101.2, 108, 100, 103.3, 103.7, 105, 101]
        },
        "lfpr": {
            "years": [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
                2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            "Spokane": [0.654940886, 0.638217302, 0.631321879, 0.637988787, 0.647612856,
                0.650873484, 0.64505575, 0.651215869, 0.65634016, 0.648102291,
                0.635798563, 0.613147897, 0.607221162, 0.593339734, 0.58155237,
                0.582577853, 0.594528216, 0.59962342, 0.604294448, 0.618944993, 0.631327844],
            "Washington": [0.671989785, 0.657195957, 0.654734639, 0.654874995, 0.65880581, 0.661082,
                0.658579957, 0.661803882, 0.666483053, 0.669471534, 0.670489496, 0.655017464,
                0.650739986, 0.64225183, 0.638157731, 0.639128253, 0.643548353, 0.646432108,
                0.648029965, 0.64707189, 0.644506668],
            "Salt Lake City": [0.641989785, 0.667195957, 0.634734639, 0.653874995, 0.64880581, 0.651082,
                0.658379957, 0.668803882, 0.662483053, 0.663471534, 0.680489496, 0.655017464,
                0.630739986, 0.6455183, 0.666157731, 0.636128253, 0.66548353, 0.65432108,
                0.643029965, 0.64307189, 0.65506668],
            "Boise": [0.631989785, 0.65195957, 0.654734639, 0.654874995, 0.6680581, 0.661082,
                0.653579957, 0.631803882, 0.676483053, 0.669471534, 0.66489496, 0.665017464,
                0.63739986, 0.645225183, 0.635157731, 0.635128253, 0.6636548353, 0.666432108,
                0.668029965, 0.66707189, 0.66506668]
        },
        "mhi": {
            "years": [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
            "Spokane": [41667, 42408, 46382, 48395, 44719, 47039, 49078, 47642, 47576, 50249, 48525, 53043, 53360, 59783, 59974],
            "Washington": [49262, 52583, 55591, 58078, 56548, 55631, 56835, 58890, 58405, 61366, 64129, 67106, 70979, 74073, 78687],
            "Salt Lake City": [50262, 54583, 58837, 61837, 65837, 64329, 63645, 63641, 65703, 65854, 67889, 70289, 71293, 72708, 75780],
            "Boise": [44583, 48583, 50591, 52078, 53664, 51105, 49374, 50745, 51427, 51736, 52094, 55193, 54467, 56590, 60999]
        },
        "mhrv": {
            "years": ["2010-Q2", "2010-Q3", "2010-Q4", "2011-Q1", "2011-Q2", "2011-Q3", "2011-Q4", "2012-Q1", "2012-Q2",
                "2012-Q3", "2012-Q4", "2013-Q1", "2013-Q2", "2013-Q3", "2013-Q4", "2014-Q1", "2014-Q2", "2014-Q3", "2014-Q4",
                "2015-Q1", "2015-Q2", "2015-Q3", "2015-Q4", "2016-Q1", "2016-Q2", "2016-Q3", "2016-Q4", "2017-Q1", "2017-Q2",
                "2017-Q3", "2017-Q4", "2018-Q1", "2018-Q2", "2018-Q3", "2018-Q4", "2019-Q1", "2019-Q2", "2019-Q3", "2019-Q4",
                "2020-Q1", "2020-Q2", "2020-Q3", "2020-Q4", "2021-Q1", "2021-Q2"],
            "Spokane": [171400, 181000, 168500, 162600, 161500, 166800, 158100, 158100, 168100, 175300, 171300, 166300, 174800,
                181700, 171900, 168000, 178500, 185800, 177600, 180300, 191400, 199400, 191100, 192700, 209500, 204600, 205500,
                208100, 225100, 225100, 222700, 225100, 253200, 252800, 247400, 255600, 277400, 284200, 276900, 288100, 307100,
                330200, 332900, 350900, 393700],
            "Washington": [246800, 248900, 239000, 228200, 226900, 225300, 217000, 208300, 236000, 243100, 242500, 237600, 251100,
                263400, 256300, 249300, 270900, 277100, 266900, 270300, 289300, 291900, 292900, 289400, 317500, 305000, 323000,
                324300, 337700, 363200, 352200, 360200, 373400, 368900, 356100, 374700, 410600, 400700, 396900, 415000, 433400,
                452900, 460300, 491900, 570800],
            "Salt Lake City": [171400, 181000, 168500, 162600, 161500, 166800, 158100, 158100, 168100, 175300, 171300, 166300, 174800,
                181700, 171900, 168000, 178500, 185800, 177600, 180300, 191400, 199400, 191100, 192700, 209500, 204600, 205500,
                208100, 225100, 225100, 222700, 225100, 253200, 252800, 247400, 255600, 277400, 284200, 276900, 288100, 307100,
                330200, 332900, 350900, 393700],
            "Boise": [246800, 248900, 239000, 228200, 226900, 225300, 217000, 208300, 236000, 243100, 242500, 237600, 251100,
                263400, 256300, 249300, 270900, 277100, 266900, 270300, 289300, 291900, 292900, 289400, 317500, 305000, 323000,
                324300, 337700, 363200, 352200, 360200, 373400, 368900, 356100, 374700, 410600, 400700, 396900, 415000, 433400,
                452900, 460300, 491900, 570800],
        }
    }

    const data = tempdata[indicatorName][key];
    // console.log("getting data for " + indicatorName + "-" + key);
    return data;
}

// returns the chartjs config for each indicator
function getConfig(indicatorName, isDetailView) {
    const spokaneColor = "#00B4ED";
    const washingtonColor = "#866BAF";
    const saltLakeColor = "#D7DC61";
    const boiseColor = "#6E7277";

    let configData = {
        "act": {

        },
        "hai": {
            type: "line",
            data: {
                labels: getData("hai", "years"),
                datasets: [{
                    data: getData("hai", "Spokane"),
                    borderColor: spokaneColor,
                    fill: true,
                    label: "Spokane",
                }, {
                    data: getData("hai", "Washington"),
                    borderColor: washingtonColor,
                    label: "Washington",
                }, {
                    data: getData("hai", "Boise"),
                    borderColor: boiseColor,
                    label: "Boise",
                }, {
                    data: getData("hai", "Salt Lake City"),
                    borderColor: saltLakeColor,
                    label: "Salt Lake City",
                }],
            },
            options: {
                responsive: true,
                legend: {
                    display: true
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Housing Affordability Index (2017 - 2021)"
                    }
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: "Housing Affordability Index"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: "Year-Quarter"
                        }
                    }]
                }
            }
        },
        "lfpr": {
            type: "line",
            data: {
                labels: getData("lfpr", "years"),
                datasets: [{
                    data: getData("lfpr", "Spokane"),
                    borderColor: spokaneColor,
                    fill: true,
                    label: "Spokane County"
                }, {
                    data: getData("lfpr", "Washington"),
                    borderColor: washingtonColor,
                    label: "Washington"
                }, {
                    data: getData("lfpr", "Boise"),
                    borderColor: boiseColor,
                    label: "Boise"
                }, {
                    data: getData("lfpr", "Salt Lake City"),
                    borderColor: saltLakeColor,
                    label: "Salt Lake City"
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: true
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Labor Force Participation Rate (2000 - 2020)"
                    }
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: "Labor Force Participation Rate"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: "Years"
                        }
                    }]
                }
            }
        },
        "mhi": {
            type: "line",
            data: {
                labels: getData("mhi", "years"),
                datasets: [{
                    data: getData("mhi", "Spokane"),
                    borderColor: spokaneColor,
                    fill: true,
                    label: "Spokane"
                }, {
                    data: getData("mhi", "Washington"),
                    borderColor: washingtonColor,
                    label: "Washington",
                    fill: false,
                }, {
                    data: getData("mhi", "Boise"),
                    borderColor: boiseColor,
                    label: "Boise",
                    fill: false,
                    hidden: true
                }, {
                    data: getData("mhi", "Salt Lake City"),
                    borderColor: saltLakeColor,
                    label: "Salt Lake City",
                    fill: false,
                    hidden: true
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: true
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Median Household Income (2005 - 2019)"
                    }
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: "Median Household Income (Dollars)"
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return '$' + value;
                            },
                            major: {
                                enabled: true
                            }
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: "Years"
                        },
                        grid: {
                            display: false
                        }
                    }]
                }
            }
        },
        "mhrv": {
            type: "line",
            data: {
                labels: getData("mhrv", "years"),
                datasets: [{
                    data: getData("mhrv", "Spokane"),
                    borderColor: spokaneColor,
                    fill: true,
                    label: "Spokane County"
                }, {
                    data: getData("mhrv", "Washington"),
                    borderColor: washingtonColor,
                    label: "Washington"
                }, {
                    data: getData("mhrv", "Boise"),
                    borderColor: boiseColor,
                    label: "Boise"
                }, {
                    data: getData("mhrv", "Salt Lake City"),
                    borderColor: saltLakeColor,
                    label: "Salt Lake City"
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: true
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Median Home Resale Value"
                    }
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: "Median Home Resale Value (Dollars)"
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return '$' + value;
                            }
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: "Year-Quarter"
                        }
                    }]
                }
            }
        }
    }

    let indicatorConfig = configData[indicatorName];
    // console.log("getting data for " + indicatorName)
    if (!isDetailView) {
        let shortIndicator = indicatorConfig.data.datasets;
        indicatorConfig.data.datasets = shortIndicator.slice(0, 2);
    }
    return indicatorConfig;
}
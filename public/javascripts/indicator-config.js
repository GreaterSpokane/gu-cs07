var indicatorConfig = {};

// HOUSING
// median housing cost
indicatorConfig.mhc = {};
indicatorConfig.mhc.description = "Description for median housing cost. Description for median housing cost. Description for median housing cost. Description for median housing cost.Description for median housing cost.";
indicatorConfig.mhc.note = "Note for data for median housing cost. Note for data for median housing cost.";
indicatorConfig.mhc.link = "https://data.census.gov/cedsci/";
indicatorConfig.mhc.initialNumIntervals = 5;    // Initial number of time intervals shown on the graph (starting from most recent)
indicatorConfig.mhc.statNumIntervals = 2;   // Number of intervals used to calcuate the short stat
indicatorConfig.mhc.isIncreaseGood = 3;     // 1 = Increase is good; 2 = Increase is Bad; 3 = Neutral
indicatorConfig.mhc.countiesFirstVisible = []
indicatorConfig.mhc.chartOptions = {
    scales: {
        y: {
            ticks: {
                callback: function (value) {
                    return '$' + String(value).slice(0, -3) + "K";
                }
            }
        }
    }
}

// median monthly rent (average rent)
indicatorConfig.mmr = {};
indicatorConfig.mmr.description = "Description for median monthly rent. Description for median monthly rent. Description for median monthly rent. Description for median monthly rent.Description for median monthly rent.";
indicatorConfig.mmr.note = "Note for data for median monthly rent. Note for data for median monthly rent.";
indicatorConfig.mmr.link = "https://data.census.gov/cedsci/";
indicatorConfig.mmr.initialNumIntervals = 5;
indicatorConfig.mmr.statNumIntervals = 2;
indicatorConfig.mmr.isIncreaseGood = 3;
indicatorConfig.mmr.chartOptions = {
    scales: {
        y: {
            ticks: {
                callback: function (value) {
                    return '$' + value;
                }
            }
        }
    }
}

// LABOR
// labor force participation rate
indicatorConfig.lfp = {};
indicatorConfig.lfp.description = "Description for labor force participation rate. Description for labor force participation rate. Description for labor force participation rate. Description for labor force participation rate.Description for labor force participation rate.";
indicatorConfig.lfp.note = "Note for data for labor force participation rate. Note for data for labor force participation rate.";
indicatorConfig.lfp.link = "https://data.census.gov/cedsci/";
indicatorConfig.lfp.initialNumIntervals = 5;
indicatorConfig.lfp.statNumIntervals = 2;
indicatorConfig.lfp.isIncreaseGood = 1;
indicatorConfig.lfp.chartOptions = {
    scales: {
        y: {
            ticks: {
                callback: function (value) {
                    return value * 100 + '%';
                }
            }
        }
    }
}

// labor force total
indicatorConfig.lft = {};
indicatorConfig.lft.description = "Description for labor force total. Description for labor force total. Description for labor force total. Description for labor force total.Description for labor force total.";
indicatorConfig.lft.note = "Note for data for labor force total. Note for data for labor force total.";
indicatorConfig.lft.link = "https://data.census.gov/cedsci/";
indicatorConfig.lft.initialNumIntervals = 5;
indicatorConfig.lft.statNumIntervals = 2;
indicatorConfig.lft.isIncreaseGood = 1;
indicatorConfig.lft.chartOptions = {
    scales: {
        y: {
            title: {
                text: "# of People",
                display: true
            },
            ticks: {
                callback: function (value) {
                    return String(value).slice(0, -3) + "K";
                }
            }
        }
    }
}

// // Employed
// indicatorConfig.emp = {};
// indicatorConfig.emp.description = "Description for Employment and Unemployment. Description for Employment and Unemployment. Description for Employment and Unemployment. Description for Employment and Unemployment.Description for Employment and Unemployment.";
// indicatorConfig.emp.note = "Note for data for Employment and Unemployment. Note for data for Employment and Unemployment.";
// indicatorConfig.emp.link = "https://data.census.gov/cedsci/";
// indicatorConfig.emp.initialNumIntervals = 5;
// indicatorConfig.emp.statNumIntervals = 2;
// indicatorConfig.emp.isIncreaseGood = 1;
// indicatorConfig.lfp.chartOptions = {
//     type: "doughnut",
//     options: {}
// }

// // Unemployed
// indicatorConfig.uem = {};
// indicatorConfig.uem.description = "Description for Employment and Unemployment. Description for Employment and Unemployment. Description for Employment and Unemployment. Description for Employment and Unemployment.Description for Employment and Unemployment.";
// indicatorConfig.uem.note = "Note for data for Employment and Unemployment. Note for data for Employment and Unemployment.";
// indicatorConfig.uem.link = "https://data.census.gov/cedsci/";
// indicatorConfig.uem.initialNumIntervals = 5;
// indicatorConfig.uem.statNumIntervals = 2;
// indicatorConfig.uem.isIncreaseGood = 1;
// indicatorConfig.lfp.chartOptions = {
//     type: "doughnut",
//     options: {}
// }

// POPULATION DRIVERS
// natural change
indicatorConfig.ntc = {};
indicatorConfig.ntc.description = "Description for natural change. Description for natural change. Description for natural change. Description for natural change.Description for natural change.";
indicatorConfig.ntc.note = "Note for data for natural change. Note for data for natural change.";
indicatorConfig.ntc.link = "https://data.census.gov/cedsci/";
indicatorConfig.ntc.initialNumIntervals = 5;
indicatorConfig.ntc.statNumIntervals = 2;
indicatorConfig.ntc.isIncreaseGood = 1;
indicatorConfig.ntc.chartOptions = {
    options: {}
}

// net domestic migration
indicatorConfig.ndm = {};
indicatorConfig.ndm.description = "Description for net domestic migration. Description for net domestic migration. Description for net domestic migration. Description for net domestic migration.Description for net domestic migration.";
indicatorConfig.ndm.note = "Note for data for net domestic migration. Note for data for net domestic migration.";
indicatorConfig.ndm.link = "https://data.census.gov/cedsci/";
indicatorConfig.ndm.initialNumIntervals = 5;
indicatorConfig.ndm.statNumIntervals = 2;
indicatorConfig.ndm.isIncreaseGood = 1;
indicatorConfig.ndm.chartOptions = {
    options: {}
}

// INCOME
// median household income
indicatorConfig.mhi = {};
indicatorConfig.mhi.description = "Description for natural change. Description for natural change. Description for natural change. Description for natural change.Description for natural change.";
indicatorConfig.mhi.note = "Note for data for natural change. Note for data for natural change.";
indicatorConfig.mhi.link = "https://data.census.gov/cedsci/";
indicatorConfig.mhi.initialNumIntervals = 5;
indicatorConfig.mhi.statNumIntervals = 2;
indicatorConfig.mhi.isIncreaseGood = 1;
indicatorConfig.mhi.chartOptions = {
    scales: {
        y: {
            ticks: {
                callback: function (value) {
                    return '$' + String(value).slice(0, -3) + "K";
                }
            }
        }
    }
}

export default indicatorConfig;
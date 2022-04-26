var indicatorConfig = {};

// HOUSING
// median housing cost
indicatorConfig.mhc = {};
indicatorConfig.mhc.description = "The cost of housing is a good indicator of the economic performance of a region. Generally, higher cost of housing indicates strong economic performance in a region, and vice versa. The median housing cost is the dollar amount of a home that divides the population into two groups: half of the homes having a cost greater than this amount, and half of the homes having a cost less than that amount. Typically, the median household cost is closely correlated with the median household income of a region.";
indicatorConfig.mhc.note = "Note for data for median housing cost. Note for data for median housing cost.";
indicatorConfig.mhc.link = "https://data.census.gov/cedsci/";
indicatorConfig.mhc.initialNumIntervals = 5; // Initial number of time intervals shown on the graph (starting from most recent)
indicatorConfig.mhc.statNumIntervals = 2; // Number of intervals used to calcuate the short stat
indicatorConfig.mhc.isIncreaseGood = 3; // 1 = Increase is good; 2 = Increase is Bad; 3 = Neutral
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
indicatorConfig.mmr.description = "The average rent is the measurement of the most usual or ordinary amount of money one can expect to pay in rent in a given county. While many factors like square footage, geographic location, and quality of living can influence the cost of rent, this measurement focuses entirely on the dollar value with little consideration to the material context of these buildings.";
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
indicatorConfig.lfp.description = "Labor force participation rate is the percentage of the population that is actively in the labor force. This indicator is a great way to understand the demographic makeup of a county as counties with lower participation rates are likely to have more citizens in retirement.";
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
indicatorConfig.lft.description = "The labor force of a county represents the total number of people over the age of 16 who are either employed or unemployed and looking for work.";
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

// Employed
indicatorConfig.emp = {};
indicatorConfig.emp.description = "This indicator measures the total number of individuals that are employed in a given region. High levels of employment generally indicates a healthy economy in a region. This indicator displays three groups: employed, unemployed, and those who are not participating in the economy, such as students or young children.";
indicatorConfig.emp.note = "Note for data for Employment and Unemployment. Note for data for Employment and Unemployment.";
indicatorConfig.emp.link = "https://data.census.gov/cedsci/";
indicatorConfig.emp.initialNumIntervals = 5;
indicatorConfig.emp.statNumIntervals = 2;
indicatorConfig.emp.isIncreaseGood = 1;
indicatorConfig.emp.chartOptions = {
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

// Unemployed
indicatorConfig.uep = {};
indicatorConfig.uep.description = "The amount of unemployed individuals in an economy is a strong indicator of the economic resilience of a region. Many factors influence the amount of unemployed individuals in a region, such as natural disaster, economic collapse, or limited economic opportunity. It is key to examine a region’s trend in unemployed individuals in order to determine its long term economic health.";
indicatorConfig.uep.note = "Note for data for Employment and Unemployment. Note for data for Employment and Unemployment.";
indicatorConfig.uep.link = "https://data.census.gov/cedsci/";
indicatorConfig.uep.initialNumIntervals = 5;
indicatorConfig.uep.statNumIntervals = 2;
indicatorConfig.uep.isIncreaseGood = 1;
indicatorConfig.uep.chartOptions = {
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

// POPULATION DRIVERS
// natural change
indicatorConfig.ntc = {};
indicatorConfig.ntc.description = "Natural change is the measurement of the number of births and deaths in a population. A greater natural increase (births - deaths > 0) means the population is growing naturally, otherwise, the population is decreasing naturally."
indicatorConfig.ntc.note = "Note for data for natural change. Note for data for natural change.";
indicatorConfig.ntc.link = "https://data.census.gov/cedsci/";
indicatorConfig.ntc.initialNumIntervals = 5;
indicatorConfig.ntc.statNumIntervals = 2;
indicatorConfig.ntc.isIncreaseGood = 1;
indicatorConfig.ntc.chartOptions = {}

// net domestic migration
indicatorConfig.ndm = {};
indicatorConfig.ndm.description = "Net domestic migration is the difference between in-migration and out-migration from a region. If the net migration is increasing, then the rate of migration into a region exceeds the rate of migration from a region. Many factors influence migration to and from regions in the United States, but it is clear that high net domestic migration strongly indicates the economic potential of a region.";
indicatorConfig.ndm.note = "Note for data for net domestic migration. Note for data for net domestic migration.";
indicatorConfig.ndm.link = "https://data.census.gov/cedsci/";
indicatorConfig.ndm.initialNumIntervals = 5;
indicatorConfig.ndm.statNumIntervals = 2;
indicatorConfig.ndm.isIncreaseGood = 1;
indicatorConfig.ndm.chartOptions = {}

// INCOME
// median household income
indicatorConfig.mhi = {};
indicatorConfig.mhi.description = "A household income is the total amount of money those living together in the same home earn in a year. The median household income is the income amount that divides the population into two groups: half of the homes having an income above this amount, and half of those homes having an income less than that amount. The median household income is heavily influenced by the national economy, however, there are many local factors that can influence a region's median household income.";
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
var indicatorConfig = {};

// HOUSING
// median housing cost
indicatorConfig.mhc = {};
indicatorConfig.mhc.description = "The cost of housing is a good indicator of the economic performance of a region. Generally, higher cost of housing indicates strong economic performance in a region, and vice versa. The median housing cost is the dollar amount of a home that divides the population into two groups: half of the homes having a cost greater than this amount, and half of the homes having a cost less than that amount. Typically, the median household cost is closely correlated with the median household income of a region.";
indicatorConfig.mhc.note = "Data from the Census Bureau's American Community Survey.";
indicatorConfig.mhc.link = "https://data.census.gov/cedsci/table?q=B25077&g=0100000US_0400000US49_0500000US49035,53063&tid=ACSDT1Y2019.B25077";
indicatorConfig.mhc.statNumIntervals = 2; // Number of years used to calcuate the short stat
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
indicatorConfig.mmr.note = "Data from the Census Bureau's American Community Survey.";
indicatorConfig.mmr.link = "https://data.census.gov/cedsci/table?q=B25105&g=0100000US_0400000US49_0500000US49035,53063";
indicatorConfig.mmr.statNumIntervals = 2;
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
indicatorConfig.lfp.note = "Data from the Census Bureau's American Community Survey.";
indicatorConfig.lfp.link = "https://data.census.gov/cedsci/table?q=B23025&g=0100000US_0400000US49_0500000US49035,53063";
indicatorConfig.lfp.statNumIntervals = 2;
indicatorConfig.lfp.chartOptions = {
    scales: {
        y: {
            ticks: {
                callback: function (value) {
                    return Math.trunc(Number(value) * 100) + '%';
                }
            }
        }
    }
}

// labor force total
indicatorConfig.lft = {};
indicatorConfig.lft.description = "The labor force of a county represents the total number of people over the age of 16 who are either employed or unemployed and looking for work.";
indicatorConfig.lft.note = "Data from the Census Bureau's American Community Survey.";
indicatorConfig.lft.link = "https://data.census.gov/cedsci/table?q=B23025&g=0100000US_0400000US49_0500000US49035,53063";
indicatorConfig.lft.statNumIntervals = 3;
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
indicatorConfig.emp.note = "Data from the Bureau of Labor Statistics.";
indicatorConfig.emp.link = "https://beta.bls.gov/dataQuery/search";
indicatorConfig.emp.statNumIntervals = 2;
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
indicatorConfig.uep.note = "Data from the Bureau of Labor Statistics.";
indicatorConfig.uep.link = "https://beta.bls.gov/dataQuery/search";
indicatorConfig.uep.statNumIntervals = 2;
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
indicatorConfig.ntc.note = "Data from the Census Bureau";
indicatorConfig.ntc.link = "https://www.census.gov/programs-surveys/popest/technical-documentation/research/evaluation-estimates/2020-evaluation-estimates.html";
indicatorConfig.ntc.statNumIntervals = 5;
indicatorConfig.ntc.chartOptions = {}

// net domestic migration
indicatorConfig.ndm = {};
indicatorConfig.ndm.description = "Net domestic migration is the difference between in-migration and out-migration from a region. If the net migration is increasing, then the rate of migration into a region exceeds the rate of migration from a region. Many factors influence migration to and from regions in the United States, but it is clear that high net domestic migration strongly indicates the economic potential of a region.";
indicatorConfig.ndm.note = "Data from the Census Bureau";
indicatorConfig.ndm.link = "https://www.census.gov/programs-surveys/popest/technical-documentation/research/evaluation-estimates/2020-evaluation-estimates.html";
indicatorConfig.ndm.statNumIntervals = 5;
indicatorConfig.ndm.chartOptions = {
    scales: {
        y: {
            title: {
                text: "In thousands",
                display: true
            },
        }
    }
}

// INCOME
// median household income
indicatorConfig.mhi = {};
indicatorConfig.mhi.description = "A household income is the total amount of money those living together in the same home earn in a year. The median household income is the income amount that divides the population into two groups: half of the homes having an income above this amount, and half of those homes having an income less than that amount. The median household income is heavily influenced by the national economy, however, there are many local factors that can influence a region's median household income.";
indicatorConfig.mhi.note = "Data from the Census Bureau's American Community Survey.";
indicatorConfig.mhi.link = "https://data.census.gov/cedsci/table?q=B19013&g=0100000US_0400000US49_0500000US49035,53063";
indicatorConfig.mhi.statNumIntervals = 2;
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

//high school graduates
indicatorConfig.hsg = {};
indicatorConfig.hsg.description = "This indicator displays the percentage of the population that has a high school degree (or equivalent) or higher. If a region has a higher level of educational attainment, the region's median household income is likely to be higher.";
indicatorConfig.hsg.note = "Data from the Census Bureau's American Community Survey.";
indicatorConfig.hsg.link = "https://data.census.gov/cedsci/table?q=B06009&g=0100000US_0400000US49_0500000US49035,53063";
indicatorConfig.hsg.statNumIntervals = 5;
indicatorConfig.hsg.chartOptions = {}

export default indicatorConfig;
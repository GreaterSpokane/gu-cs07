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
indicatorConfig.mhc.chartConfig = {
    type: "line",
    options: {}
}

// median monthly rent (average rent)
indicatorConfig.mmr = {};
indicatorConfig.mmr.description = "Description for median monthly rent. Description for median monthly rent. Description for median monthly rent. Description for median monthly rent.Description for median monthly rent.";
indicatorConfig.mmr.note = "Note for data for median monthly rent. Note for data for median monthly rent.";
indicatorConfig.mmr.link = "https://data.census.gov/cedsci/";
indicatorConfig.mmr.initialNumIntervals = 5;
indicatorConfig.mmr.statNumIntervals = 2;
indicatorConfig.mmr.isIncreaseGood = 3;
indicatorConfig.mmr.chartConfig = {
    type: "line",
    options: {}
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
indicatorConfig.lfp.chartConfig = {
    type: "line",
    options: {}
}

// labor force total
indicatorConfig.lft = {};
indicatorConfig.lft.description = "Description for labor force total. Description for labor force total. Description for labor force total. Description for labor force total.Description for labor force total.";
indicatorConfig.lft.note = "Note for data for labor force total. Note for data for labor force total.";
indicatorConfig.lft.link = "https://data.census.gov/cedsci/";
indicatorConfig.lft.initialNumIntervals = 5;
indicatorConfig.lft.statNumIntervals = 2;
indicatorConfig.lft.isIncreaseGood = 1;
indicatorConfig.lft.chartConfig = {
    type: "line",
    options: {}
}

// // Employed
// indicatorConfig.emp = {};
// indicatorConfig.emp.description = "Description for Employment and Unemployment. Description for Employment and Unemployment. Description for Employment and Unemployment. Description for Employment and Unemployment.Description for Employment and Unemployment.";
// indicatorConfig.emp.note = "Note for data for Employment and Unemployment. Note for data for Employment and Unemployment.";
// indicatorConfig.emp.link = "https://data.census.gov/cedsci/";
// indicatorConfig.emp.initialNumIntervals = 5;
// indicatorConfig.emp.statNumIntervals = 2;
// indicatorConfig.emp.isIncreaseGood = 1;
// indicatorConfig.lfp.chartConfig = {
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
// indicatorConfig.lfp.chartConfig = {
//     type: "doughnut",
//     options: {}
// }

// POPULATION DRIVERS
// natural change
indicatorConfig.ntc = {};
indicatorConfig.ntc.description = "Natural change is the measurement of the number of births and deaths in a population. A greater natural increase (births - deaths > 0) means the population is growing naturally, otherwise, the population is decreasing naturally."
indicatorConfig.ntc.note = "Note for data for natural change. Note for data for natural change.";
indicatorConfig.ntc.link = "https://data.census.gov/cedsci/";
indicatorConfig.ntc.initialNumIntervals = 5;
indicatorConfig.ntc.statNumIntervals = 2;
indicatorConfig.ntc.isIncreaseGood = 1;
indicatorConfig.ntc.chartConfig = {
    type: "line",
    options: {}
}

// net domestic migration
indicatorConfig.ndm = {};
indicatorConfig.ndm.description = "Net domestic migration is the difference between in-migration and out-migration from a region. If the net migration is increasing, then the rate of migration into a region exceeds the rate of migration from a region. Many factors influence migration to and from regions in the United States, but it is clear that high net domestic migration strongly indicates the economic potential of a region.";
indicatorConfig.ndm.note = "Note for data for net domestic migration. Note for data for net domestic migration.";
indicatorConfig.ndm.link = "https://data.census.gov/cedsci/";
indicatorConfig.ndm.initialNumIntervals = 5;
indicatorConfig.ndm.statNumIntervals = 2;
indicatorConfig.ndm.isIncreaseGood = 1;
indicatorConfig.ndm.chartConfig = {
    type: "line",
    options: {}
}

// INCOME
// median household income
indicatorConfig.mhi = {};
indicatorConfig.mhi.description = "A household income is the total amount of money those living in a home earn in a year. The median household income is the income amount that divides the population into two groups: half of the homes having an income above this amount, and half of those homes having an income less than that amount. The median household income is heavily influenced by the national economy, however, there are many local factors that can influence a region's median household income.";
indicatorConfig.mhi.note = "Note for data for natural change. Note for data for natural change.";
indicatorConfig.mhi.link = "https://data.census.gov/cedsci/";
indicatorConfig.mhi.initialNumIntervals = 5;
indicatorConfig.mhi.statNumIntervals = 2;
indicatorConfig.mhi.isIncreaseGood = 1;
indicatorConfig.mhi.chartConfig = {
    type: "line",
    options: {}
}

export default indicatorConfig;
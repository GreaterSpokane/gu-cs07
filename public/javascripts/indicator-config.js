var indicatorConfig = {};

// labor force participation rate
indicatorConfig.lfp = {};
indicatorConfig.lfp.description = "This is a description for the Labor Force Participation Rate. Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
indicatorConfig.lfp.note = "Note about data source for Labor Force Participation Rate. Eiusmod tempor incididunt ut labore et dolore magna aliqua.";
indicatorConfig.lfp.link = "https://data.census.gov/cedsci/";
indicatorConfig.lfp.initialNumIntervals = 5;    // Initial number of time intervals shows on the graph
indicatorConfig.lfp.statNumIntervals = 2;   // Number of intervals to calcuate the short interval stat shown on the card
indicatorConfig.lfp.isIncreaseGood = true;
indicatorConfig.lfp.isLineChart = true;

// median household income
indicatorConfig.mhi = {};
indicatorConfig.mhi.description = "This is a description for the Median Household Income. Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
indicatorConfig.mhi.note = "Note about data source for Median Household Income. Eiusmod tempor incididunt ut labore et dolore magna aliqua.";
indicatorConfig.mhi.link = "https://data.census.gov/cedsci/";
indicatorConfig.mhi.initialNumIntervals = 5;    
indicatorConfig.mhi.statNumIntervals = 2;  
indicatorConfig.mhi.isIncreaseGood = true;
indicatorConfig.mhi.isLineChart = true;

export default indicatorConfig;
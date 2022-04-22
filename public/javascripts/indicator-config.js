var indicatorConfig = {};

// HOUSING
// median housing cost
indicatorConfig.mhc = {};
indicatorConfig.mhc.description = "description for median housing cost. description for median housing cost. description for median housing cost. description for median housing cost.description for median housing cost..";
indicatorConfig.mhc.note = "note for data for median housing cost. note for data for median housing cost.";
indicatorConfig.mhc.link = "https://data.census.gov/cedsci/";  
indicatorConfig.mhc.initialNumIntervals = 5;    // Initial number of time intervals shown on the graph (starting from most recent)
indicatorConfig.mhc.statNumIntervals = 2;   // Number of intervals used to calcuate the short stat
indicatorConfig.mhc.isIncreaseGood = 3;     // 1 = Increase is good; 2 = Increase is Bad; 3 = Neutral

// median monthly rent
indicatorConfig.mmr = {};
indicatorConfig.mmr.description = "description for median monthly rent. description for median monthly rent. description for median monthly rent. description for median monthly rent.description for median monthly rent..";
indicatorConfig.mmr.note = "note for data for median monthly rent. note for data for median monthly rent.";
indicatorConfig.mmr.link = "https://data.census.gov/cedsci/";
indicatorConfig.mmr.initialNumIntervals = 5;    
indicatorConfig.mmr.statNumIntervals = 2;   
indicatorConfig.mmr.isIncreaseGood = 3;   

// housing affordability index
indicatorConfig.hai = {};
indicatorConfig.hai.description = "description for housing affordability index. description for housing affordability index. description for housing affordability index. description for housing affordability index.description for housing affordability index..";
indicatorConfig.hai.note = "note for data for housing affordability index. note for data for housing affordability index.";
indicatorConfig.hai.link = "https://data.census.gov/cedsci/";
indicatorConfig.hai.initialNumIntervals = 5;    
indicatorConfig.hai.statNumIntervals = 2;   
indicatorConfig.hai.isIncreaseGood = 2;   


// LABOR
// labor force participation rate
indicatorConfig.lfp = {};
indicatorConfig.lfp.description = "description for labor force participation rate. description for labor force participation rate. description for labor force participation rate. description for labor force participation rate.description for labor force participation rate..";
indicatorConfig.lfp.note = "note for data for labor force participation rate. note for data for labor force participation rate.";
indicatorConfig.lfp.link = "https://data.census.gov/cedsci/";
indicatorConfig.lfp.initialNumIntervals = 5;    
indicatorConfig.lfp.statNumIntervals = 2;   
indicatorConfig.lfp.isIncreaseGood = 1;

// labor force total
indicatorConfig.lft = {};
indicatorConfig.lft.description = "description for labor force total. description for labor force total. description for labor force total. description for labor force total.description for labor force total..";
indicatorConfig.lft.note = "note for data for labor force total. note for data for labor force total.";
indicatorConfig.lft.link = "https://data.census.gov/cedsci/";
indicatorConfig.lft.initialNumIntervals = 5;    
indicatorConfig.lft.statNumIntervals = 2;   
indicatorConfig.lft.isIncreaseGood = 1;

// add employment/unemployement here later, going to combined it into a pie chart?

// POPULATION DRIVERS
// natural change
indicatorConfig.ntc = {};
indicatorConfig.ntc.description = "description for natural change. description for natural change. description for natural change. description for natural change.description for natural change..";
indicatorConfig.ntc.note = "note for data for natural change. note for data for natural change.";
indicatorConfig.ntc.link = "https://data.census.gov/cedsci/";
indicatorConfig.ntc.initialNumIntervals = 5;    
indicatorConfig.ntc.statNumIntervals = 2;   
indicatorConfig.ntc.isIncreaseGood = 1;

// net domestic migration
indicatorConfig.ndm = {};
indicatorConfig.ndm.description = "description for net domestic migration. description for net domestic migration. description for net domestic migration. description for net domestic migration.description for net domestic migration..";
indicatorConfig.ndm.note = "note for data for net domestic migration. note for data for net domestic migration.";
indicatorConfig.ndm.link = "https://data.census.gov/cedsci/";
indicatorConfig.ndm.initialNumIntervals = 5;    
indicatorConfig.ndm.statNumIntervals = 2;   
indicatorConfig.ndm.isIncreaseGood = 1;


// INCOME
// median household income
indicatorConfig.mhi = {};
indicatorConfig.mhi.description = "description for natural change. description for natural change. description for natural change. description for natural change.description for natural change..";
indicatorConfig.mhi.note = "note for data for natural change. note for data for natural change.";
indicatorConfig.mhi.link = "https://data.census.gov/cedsci/";
indicatorConfig.mhi.initialNumIntervals = 5;    
indicatorConfig.mhi.statNumIntervals = 2;   
indicatorConfig.mhi.isIncreaseGood = 1;

export default indicatorConfig;
/**
 * Multiple entry retrieval controller for the Median Income model
 */

 const MedianIncome = require("../../models/medianIncome");

 module.exports = async function getManyMedianIncome(county, start_year, end_year) {
     try {
         var data = await MedianIncome.aggregate()
             .match({
                 county: county,
                 year: { $gte: start_year, $lte: end_year }
             })
             .group({
                 _id: '$year',
                 medianIncome: { $first: '$medianIncome' },
             })
             .sort({ _id: -1 });
         var result = { 'county': county, 'data': data };
         return result;
     } catch (err) {
         throw err;
     }
 }
/**
 * Single entry retrieval controller for the Median Income indicator model
 */

 const MedianIncome = require("../../models/medianIncome");

 /* Retrieve documents using county and year as a composite key  */
 module.exports = async function getMedianIncome(county, year) {
     try {
         var data = await MedianIncome.findOne({ county: county, year: year }).exec();
         if (data == null) throw new Error('Data not found for given county and year');
         var result = {
             'corr_id': data._id,
             'county': data.county,
             'state': data.state,
             'year': data.year,
             'medianIncome': data.medianIncome
         }
 
         return result;
     } catch (err) {
         throw err;
     }
 }
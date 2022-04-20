/**
 * Creation controller for the Median Income model
 */

 const MedianIncome = require("../../models/medianIncome");

 module.exports = async function createMedianIncome(
     county,
     state,
     year,
     medianIncome) {
     /**
      * Should return id code of newly created Median Income indicator object
      */
 
     try {
         //  TODO: Validation steps
         const newMedianIncome = new MedianIncome({
             county: county,
             state: state,
             year: year,
             medianIncome: parseFloat(medianIncome),
         });
 
         await newMedianIncome.save();
         return { corr_id: newMedianIncome._id };
     } catch (err) {
         throw err
     }
 }
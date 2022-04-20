/**
 * Delete Median Income entry by id
 */

 const { ObjectId } = require('bson');
 const MedianIncome = require("../../models/medianIncome");
 
 module.exports = async function deleteMedianIncome(corr_id) {
     try {
         await MedianIncome.deleteOne({ _id: ObjectId(corr_id) },
             (err, docs) => {
                 if (err) throw err;
                 return { result: "Success" }
             })
     } catch (err) {
         return {
             result: "Failure",
             error: err
         }
     }
 }
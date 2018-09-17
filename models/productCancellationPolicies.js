const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ProductCancellationPoliciesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  returnPercentage: {
    type: Number,
    required: true
  },
  daysBefore: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = ProductCancellationPolicies = mongoose.model(
  "productCancellationPolicy",
  ProductCancellationPoliciesSchema
);

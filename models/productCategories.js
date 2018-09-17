const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ProductCategoriesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = ProductCategories = mongoose.model(
  "productCategories",
  ProductCategoriesSchema
);

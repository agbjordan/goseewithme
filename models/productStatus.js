const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ProductStatusSchema = new Schema({
  status: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    default: 1
  }
});

module.exports = productStatus = mongoose.model(
  "productStatus",
  ProductStatusSchema
);

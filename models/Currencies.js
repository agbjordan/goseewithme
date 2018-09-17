const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const CurrenciesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ISOcode: {
    type: String,
    required: true
  },
  exchangeRate: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    default: "$"
  },
  decimals: {
    type: Boolean,
    default: false
  },
  roundTo: {
    type: Number,
    default: 1
  },
  active: {
    type: Boolean,
    default: 1
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Currencies = mongoose.model("currencies", CurrenciesSchema);

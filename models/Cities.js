const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ContinentsSchema = new Schema({
  cityName: {
    type: String,
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "countries"
  },
  countryName: {
    type: String,
    required: true
  },
  continent: {
    type: Schema.Types.ObjectId,
    ref: "continents"
  },
  continentName: {
    type: String,
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

module.exports = Continents = mongoose.model("cities", ContinentsSchema);

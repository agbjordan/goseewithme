const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ContinentsSchema = new Schema({
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

module.exports = Continents = mongoose.model("continents", ContinentsSchema);

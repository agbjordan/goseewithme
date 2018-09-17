const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const GoSeeDefaultsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Sting,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = GoSeeDefaults = mongoose.model(
  "goSeeDefaults",
  GoSeeDefaultsSchema
);

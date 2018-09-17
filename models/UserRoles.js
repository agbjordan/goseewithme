const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const UserRolesSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});

module.exports = UserRoles = mongoose.model("userRoles", UserRolesSchema);

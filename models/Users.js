const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//fix deprecation warning on findone
mongoose.set("useFindAndModify", false);

//create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: "traveller"
  },
  date: {
    type: Date,
    default: Date.now
  },
  totalLogins: {
    type: Number,
    default: 1
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);

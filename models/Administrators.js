const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const AdministratorsSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  surname: {
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
  userRole: {
    type: String,
    default: 5
  },
  date: {
    type: Date,
    default: Date.now
  },
  customRoles: {
    administrators: {
      type: Boolean,
      default: true
    },
    affiliates: {
      type: Boolean,
      default: true
    },
    agents: {
      type: Boolean,
      default: true
    },
    bookings: {
      type: Boolean,
      default: true
    },
    guides: {
      type: Boolean,
      default: true
    },
    influencers: {
      type: Boolean,
      default: true
    },
    products: {
      type: Boolean,
      default: true
    },
    reviews: {
      type: Boolean,
      default: true
    },
    settings: {
      type: Boolean,
      default: true
    },
    transactions: {
      type: Boolean,
      default: true
    },
    travellers: {
      type: Boolean,
      default: true
    }
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

module.exports = Administrators = mongoose.model(
  "administrators",
  AdministratorsSchema
);

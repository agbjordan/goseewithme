const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//List of Props in Schema
//  user            // string // required
//  handle          // string // required
//  profileImg      // string
//  contactInfo     // object
//    telephone     // string // required
//    mobile        // string
//    email         // string // required
//    addressLine01 // string
//    addressLine02 // string
//    city          // string
//    state         // string
//    country       // string
//    zipcode       // string
//  follows         // array of strings
//  socialMedia     // object
//    facebook      // string
//    twitter       // string
//    line          // string
//    wechat        // string
//    whatsapp      // string
//    linkedin      // string
//  newsletters     // object
//    product       // boolean
//    website       // boolean
//    competitons   // boolean
//  date            // number // default Date.now
//  totalLogins     // number // default 1
//  lastLogin       // number // default Date.now

//create schema
const TravellerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  profileImg: {
    type: String
  },
  contactInfo: [
    {
      telephone: {
        type: String,
        required: true
      },
      mobile: {
        type: String
      },
      email: {
        type: String,
        required: true
      },
      addressLine01: {
        type: String
      },
      addressLine02: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      country: {
        type: String
      },
      zipcode: {
        type: String
      }
    }
  ],
  follows: {
    type: [String]
  },
  socialMedia: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    line: {
      type: String
    },
    wechat: {
      type: String
    },
    whatsapp: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  newsletters: {
    products: {
      type: Boolean,
      default: false
    },
    website: {
      type: Boolean,
      default: false
    },
    guideNews: {
      type: Boolean,
      default: false
    },
    agentNews: {
      type: Boolean,
      default: false
    },
    competitions: {
      type: Boolean,
      default: false
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  totalLogins: {
    type: Number,
    default: 1,
    min: 1
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

module.exports = Traveller = mongoose.model(
  "travellerProfile",
  TravellerSchema
);

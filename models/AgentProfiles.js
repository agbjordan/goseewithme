const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//fix deprecation warning on findone
mongoose.set("useFindAndModify", false);

//List of Props in Schema
//  user            // string // required
//  subUsers        // array of strings
//  handle          // string // required
//  profileImg      // string
//  companyName     // string // required
//  website         // string
//  bio             // string
//  avgRating       // number // required // default 0
//  accreditations  // array of objects
//    validated     // boolean // required
//    licenseID     // string
//    licenseAuth   // string
//    licenseDate   // date
//    licenseExpiry // date
//    licenseImg    // string
//  contactInfo     // object
//    telephone     // string // required
//    hotline       // string
//    email         // string // required
//    addressLine01 // string
//    addressLine02 // string
//    city          // string
//    state         // string
//    country       // string
//    zipcode       // string
//  operateIn       // array of strings
//  guides          // array of strings
//  products        // array of strings
//  follows         // array of strings
//  followers       // array of strings
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
//    guideNews     // boolean
//    agentNews     // boolean
//    competitons   // boolean
//  date            // number // default Date.now
//  totalLogins     // number // default 1
//  lastLogin       // number // default Date.now

//create schema
const AgentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  subUsers: {
    type: [String]
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  profileImg: {
    type: String
  },
  companyName: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  avgRating: {
    type: Number,
    max: 5,
    min: 0,
    default: 0,
    required: true
  },
  accreditations: [
    {
      validated: {
        type: Boolean,
        required: true
      },
      licenseID: {
        type: String
      },
      licenseAuth: {
        type: String
      },
      licenseDate: {
        type: Date
      },
      licenseExpiry: {
        type: Date
      },
      licenseImg: {
        type: String
      }
    }
  ],
  contactInfo: [
    {
      telephone: {
        type: String,
        required: true
      },
      hotline: {
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
  operateIn: {
    type: [String]
  },
  guides: {
    type: [String]
  },
  products: {
    type: [String]
  },
  follows: {
    type: [String]
  },
  followers: {
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

module.exports = Agent = mongoose.model("agentProfile", AgentSchema);

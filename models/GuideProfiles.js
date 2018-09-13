const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//fix deprecation warning on findone
mongoose.set("useFindAndModify", false);

//List of Props in Schema
//  user            // string // required
//  handle          // string // required
//  profileImg      // string
//  bio             // string
//  age             // number // min: 16
//  nationality     // string // required
//  gender          // string
//  languages       // array of objects
//    language      // string // required
//    speaking      // string // required
//    reading       // string // required
//    writing       // string // required
//  avgRating       // number // required // default 0
//  license         // object
//    validated     // boolean // required
//    licenseID     // string
//    licenseAuth   // string
//    licenseDate   // date
//    licenseExpiry // date
//    licenseImg    // string
//  contactInfo     // object
//    telephone     // string // required
//    mobile        // string
//    email         // string // required
//    addressLine01 // string
//    addressLine02 // string
//    city          // string // required
//    state         // string
//    country       // string // required
//    zipcode       // string
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
//    instagram     // string
//  newsletters     // object
//    productNews   // boolean
//    websiteNews   // boolean
//    guideNews     // boolean
//    agentNews     // boolean
//    competitonNews// boolean
//  date            // number // default Date.now
//  totalLogins     // number // default 1
//  lastLogin       // number // default Date.now

//create schema
const GuideSchema = new Schema({
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
  bio: {
    type: String
  },
  age: {
    type: Number,
    min: 16
  },
  nationality: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  languages: [
    {
      language: {
        type: String,
        required: true
      },
      speaking: {
        type: String,
        required: true
      },
      reading: {
        type: String,
        required: true
      },
      writing: {
        type: String,
        required: true
      }
    }
  ],
  avgRating: {
    type: Number,
    max: 5,
    min: 0,
    default: 0,
    required: true
  },
  license: {
    validated: {
      type: Boolean,
      default: false,
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
  },
  contactInfo: {
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
      type: String,
      required: true
    },
    state: {
      type: String
    },
    country: {
      type: String,
      required: true
    },
    zipcode: {
      type: String
    }
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
    },
    instagram: {
      type: String
    }
  },
  newsletters: {
    productNews: {
      type: Boolean,
      default: false
    },
    websiteNews: {
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
    competitionNews: {
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

module.exports = Guide = mongoose.model("guideProfile", GuideSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const TransactionSchema = new Schema({
  TransactionId: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  title: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currencies: {
    paymentCurrency: {
      type: Object.Types.ObjectId,
      ref: "currencies"
    },
    productCurrency: {
      type: Object.Types.ObjectId,
      ref: "currencies"
    },
    baseCurrency: {
      type: Object.Types.ObjectId,
      ref: "currencies"
    },
    paymentExchangeRate: {
      type: Number,
      default: 1
    },
    productExchangeRate: {
      type: Number,
      default: 1
    },
    baseExchangeRate: {
      type: Number,
      default: 1
    }
  },
  paid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: "unprocessed"
  },
  notes: {
    type: [
      {
        text: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        },
        userID: {
          type: Schema.Types.ObjectId,
          ref: "users"
        },
        name: {
          type: String,
          required: true
        }
      }
    ]
  },
  paidTo: {
    id: {
      type: String,
      required: true,
      default: "0"
    },
    name: {
      type: String
    },
    companyName: {
      type: String
    },
    email: {
      type: String
    },
    telephone: {
      type: String
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
  },
  paidBy: {
    id: {
      type: String,
      required: true,
      default: "0"
    },
    name: {
      type: String
    },
    companyName: {
      type: String
    },
    email: {
      type: String
    },
    telephone: {
      type: String
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
  },
  date: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Transaction = mongoose.model(
  "transactions",
  TransactionSchema
);

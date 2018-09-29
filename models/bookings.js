const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const BookingsSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
  bookingId: {
    type: String,
    required: true
  },
  voucherId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "On Request"
  },
  traveller: {
    travellerId: {
      type: Schema.Types.ObjectId,
      ref: "travellerProfile",
      default: 0
    },
    travellerName: {
      type: String,
      required: True
    },
    travellerTelephone: {
      type: String,
      required: True
    },
    travellerEmail: {
      type: String,
      required: True
    }
  },
  optionalInfo: {
    type: [
      {
        name: {
          Type: String,
          required: true
        },
        value: {
          Type: String,
          required: true
        }
      }
    ]
  },
  productOwner: {
    userRole: {
      type: Schema.Types.ObjectId,
      ref: "userRoles"
    },
    ownerId: {
      type: String,
      required: true
    }
  },
  dates: {
    createdOn: {
      type: Date,
      default: Date.now
    },
    departureDate: {
      type: Date,
      required: true
    },
    decisionDate: {
      type: Date
    },
    approvalDate: {
      type: Date
    },
    cancelDate: {
      type: Date
    },
    rejectionDate: {
      type: Date
    },
    lastDayToCancel: {
      type: Date,
      required: true
    },
    lastUpdated: {
      type: Date
    }
  },
  purchase: {
    items: {
      type: [
        {
          itemName: {
            type: String,
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            default: 0
          },
          itemPriceIndividual: {
            type: Number,
            required: true,
            default: 0
          },
          itemPriceTotal: {
            type: Number,
            required: true,
            default: 0
          }
        }
      ]
    },
    discountPercentage: {
      type: Number,
      required: true,
      default: 0
    },
    discountAmount: {
      type: Number,
      required: true,
      default: 0
    },
    GoSeeFeePercentage: {
      type: Number,
      required: true,
      default: 0
    },
    GoSeeFeeAmount: {
      type: Number,
      required: true,
      default: 0
    },
    priceBeforeTax: {
      type: Number,
      required: true,
      default: 0
    },
    taxPercentage: {
      type: Number,
      required: true,
      default: 0
    },
    taxAmount: {
      type: Number,
      required: true,
      default: 0
    },
    finalPrice: {
      type: Number,
      required: true,
      default: 0
    },
    transactions: {
      type: [Object.Type.ObjectId],
      ref: "transactions"
    }
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
  }
});

module.exports = Bookings = mongoose.model("bookings", BookingsSchema);

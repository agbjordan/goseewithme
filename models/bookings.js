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
      type: String,
      required: False,
      Default: 0
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
  optional: {
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
    departureDate: {
      type: Date,
      required: true
    },
    decisionDate: {
      type: Date
    },
    createdOn: {
      type: Date,
      default: Date.now
    },
    cancellationDate: {
      type: Date
    },
    lastDayToCancel: {
      type: Date,
      required: true
    }
  },
  purchases: {
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
    }
  },
  currency: {
    productCurrency: {
      type: Schema.Types.ObjectId,
      ref: "currencies",
      required: true
    },
    paymentCurrency: {
      type: Schema.Types.ObjectId,
      ref: "currencies",
      required: true
    },
    exchangeRate: {
      type: Number,
      default: 1,
      required: true
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
  },
  transactions: {
    type: [
      {
        transactionId: {
          type: String,
          required: true
        },
        transactionType: {
          type: String,
          required: true
        },
        refId: {
          type: string,
          required: true
        },
        transactionDate: {
          type: Date,
          default: Date.now
        },
        title: {
          type: Number,
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          required: true
        },
        currency: {
          type: Schema.Types.ObjectId,
          ref: "currencies"
        },
        exchangeRate: {
          type: Number,
          default: 1
        },
        status: {
          type: String,
          required: true
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
      }
    ]
  }
});

module.exports = Bookings = mongoose.model("bookings", BookingsSchema);

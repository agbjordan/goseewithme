const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  refId: {
    type: String,
    required: true
  },
  agentId: {
    type: Schema.Types.ObjectId,
    ref: "agents"
  },
  guideId: {
    type: Schema.Types.ObjectId,
    ref: "guides"
  },
  role: {
    type: [Schema.Types.ObjectId],
    ref: "userRoles"
  },
  details: {
    summary: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    itineray: {
      type: [
        {
          order: {
            type: Number,
            default: 0
          },
          startTime: {
            type: Date
          },
          endTime: {
            type: Date
          },
          text: {
            type: String,
            required: true
          },
          image: {
            type: String
          }
        }
      ]
    },
    highlights: {
      type: [
        {
          title: {
            type: String,
            required: true
          },
          text: {
            type: String
          },
          icon: {
            type: String
          }
        }
      ]
    },
    cancellation: {
      type: Schema.Types.ObjectId,
      ref: "productCancellationPolicy",
      required: true
    },
    thumbnail: {
      type: String
    },
    hero: {
      type: String
    },
    gallery: {
      type: [Schema.Types.ObjectId],
      ref: "productImages"
    },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: "productCategories"
    },
    features: {
      type: [Schema.Types.ObjectId],
      ref: "productFeatures"
    },
    map: [
      {
        title: {
          type: String,
          required: true
        },
        text: {
          type: String
        },
        latitude: {
          type: Number
        },
        longitude: {
          type: Number
        }
      }
    ]
  },
  location: {
    continent: {
      type: String,
      required: true
    },
    continentId: {
      type: [Schema.Types.ObjectId],
      required: "continents"
    },
    country: {
      type: String,
      required: true
    },
    countryId: {
      type: [Schema.Types.ObjectId],
      required: "countries"
    },
    city: {
      type: String,
      required: true
    },
    cityId: {
      type: [Schema.Types.ObjectId],
      required: "cities"
    }
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "reviews"
  },
  currencyDefault: {
    type: Schema.Types.ObjectId,
    ref: "currencies"
  },
  items: {
    type: [
      {
        itemName: {
          type: String,
          required: true
        },
        min: {
          type: Number,
          default: 0
        },
        max: {
          type: Number,
          default: 20
        },
        restrictions: {
          type: String
        },
        price: {
          type: Number,
          required: true,
          default: 0
        },
        priceByDate: {
          type: [
            {
              startDate: {
                type: Date,
                required: true,
                default: Date.now
              },
              endDate: {
                type: Date,
                required: true,
                default: Date.now
              },
              price: {
                type: Number,
                required: true,
                default: 0
              },
              blocked: {
                type: Boolean,
                default: false
              }
            }
          ]
        }
      }
    ]
  },
  addons: {
    type: [
      {
        addonName: {
          type: String,
          required: true
        },
        description: {
          type: String
        },
        min: {
          type: Number,
          default: 0
        },
        max: {
          type: Number,
          default: 20
        },
        restrictions: {
          type: String
        },
        price: {
          type: Number,
          required: true,
          default: 0
        }
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  },
  statusPrevious: {
    type: [Schema.Types.ObjectId],
    ref: "productStatus"
  },
  statusCurrent: {
    type: [Schema.Types.ObjectId],
    ref: "productStatus"
  }
});

module.exports = Products = mongoose.model("products", ProductsSchema);

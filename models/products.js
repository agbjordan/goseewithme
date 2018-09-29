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
    ref: "users"
  },
  guideIds: {
    type: [Schema.Types.ObjectId],
    ref: "users"
  },
  details: {
    summary: {
      type: String,
      required: true
    },
    description: {
      type: String
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
    }
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
  ],
  categories: {
    type: [Schema.Types.ObjectId],
    ref: "productCategories"
  },
  features: {
    type: [Schema.Types.ObjectId],
    ref: "productFeatures"
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "reviews"
  },
  currencyDefault: {
    type: Schema.Types.ObjectId,
    ref: "currencies"
  },
  lowestPrice: {
    type: Number
  },
  options: {
    type: [
      {
        optionName: {
          type: String,
          required: true
        },
        optionSummary: {
          type: String,
          required: true
        },
        optionDetails: {
          type: String,
          required: true
        },
        rating: {
          type: Number
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
        }
      }
    ]
  },
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
  cancellationPolicy: {
    type: Schema.Types.ObjectId,
    ref: "CancellationPolicy",
    required: true
  },
  images: {
    thumbnail: {
      type: String
    },
    hero: {
      type: String
    },
    gallery: {
      type: [Schema.Types.ObjectId],
      ref: "productImages"
    }
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
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

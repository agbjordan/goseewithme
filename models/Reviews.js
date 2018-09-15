const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//fix deprecation warning on findone
mongoose.set("useFindAndModify", false);

//Create Schema
const ReviewsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  reviewType: {
    type: String,
    required: true,
    default: "Product"
  },
  status: {
    type: String,
    default: "inactive"
  },
  productID: {
    type: String,
    required: true,
    match: "^[a-zA-Z0-9]{24}"
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  avatar: {
    type: String
  },
  rating: {
    type: Number,
    default: 0,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  shares: {
    type: Number,
    default: 0
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      author: {
        type: String
      },
      avatar: {
        type: String
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Reviews = mongoose.model("reviews", ReviewsSchema);

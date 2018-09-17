const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ProductImagesSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product"
  },
  imageURL: {
    type: String,
    required: true
  },
  altText: {
    type: String
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  extension: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    default: 1
  }
});

module.exports = productImages = mongoose.model(
  "productImages",
  ProductImagesSchema
);

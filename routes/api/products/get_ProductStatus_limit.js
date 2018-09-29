//model
const Products = require("../../../models/Products");
const ProductStatus = require("../../../models/ProductStatus");

//validation
const validate = require("../../../validation/products/get_ProductStatus");

module.exports = function get(req, res) {
  const { errors, isValid } = validate(req.params);
  let errors = {};
  let status = "live";
  let limit = 100;
  let limit_min = 1;
  let limit_max = 300;
  let limit_base = 10;
  const msg = {
    productNotFound: "Product was not found",
    productError: "Could not find product",
    collectionError: "Could not connect to database",
    statusError:
      "Status found not be found. Must be either Draft, Live, Published, Review, or Suspended.",
    limitNotNumber: "The limit must be a number between 1 and 300"
  };

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //status
  if (req.params.status) {
    let exists = ProductStatus.find(req.params.status)
      .then(response => response.status)
      .catch(err => {
        console.log(err);
        errors.statusError = msg.statusError;
        return res.status(400).json(errors);
      });

    if (exists || typeof exists === "string") {
      status = exists;
    }
  }

  //error limit
  if (req.params.limit) {
    //convert limit to a integer
    let newLimit = parseInt(req.params.limit, limit_base);
    // check if it is now a number
    if (
      typeof newLimit !== "number" ||
      isNaN(newLimit) === true ||
      newLimit < limit_min ||
      newLimit > limit_max
    ) {
      errors.limitNotNumber = msg.limitNotNumber;
      return res.status(404).json(errors);
    }
    //update limit with valid value
    limit = parseInt(newLimit, limit_base);
  } else {
    errors.limitNotNumber = msg.limitNotNumber;
    return res.status(404).json(errors);
  }

  //run the switch to find the current profile
  Products.find({ status })
    .limit(limit)
    .sort({ name })
    .then(product => {
      if (product) {
        if (!product[0]) {
          errors.productNotFound = msg.productNotFound;
          return res.status(200).json(errors);
        }
        return res.status(200).json(product);
      } else {
        errors.productError = msg.productError;
        return res.status(404).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
      errors.collectionError = msg.collectionError;
      return res.status(400).json(errors);
    });
};

//model
const Products = require("../../../models/Products");
const ProductStatus = require("../../../models/ProductStatus");

//validation
const validate = require("../../../validation/products/get_ProductStatus");

module.exports = function get(req, res) {
  const { errors, isValid } = validate(req.params);
  let errors = {};
  let status = "live";
  const msg = {
    productNotFound: "Product was not found",
    productError: "Could not find product",
    collectionError: "Could not connect to database",
    statusError:
      "Status found not be found. Must be either Draft, Live, Published, Review, or Suspended."
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

  //run the switch to find the current profile
  Products.find({ status })
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

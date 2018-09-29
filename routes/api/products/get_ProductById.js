//model
const Products = require("../../../models/Products");

//validation
const validate = require("../../../validation/products/get_ProductById");

module.exports = function get(req, res) {
  const { errors, isValid } = validate(req.params);
  const msg = {
    productNotFound: "Product was not found",
    productError: "Could not find product",
    collectionError: "Could not connect to database"
  };

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //run the switch to find the current profile
  Products.findOne({ _id: req.params.id })
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

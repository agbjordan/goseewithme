const Products = require("../../../models/Products");

module.exports = function get(req, res) {
  let errors = {};
  const msg = {
    productNotFound: "No products where found",
    productError: "Could not collect products"
  };

  //run the switch to find the current profile
  Products.find()
    .sort({ name })
    .then(products => {
      if (products) {
        if (!products[0]) {
          errors.productNotFound = msg.productNotFound;
          return res.status(200).json(errors);
        }
        return res.status(200).json(products);
      } else {
        errors.productNotFound = msg.productNotFound;
        return res.status(200).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
      errors.productError = msg.productError;
      return res.status(400).json(errors);
    });
};

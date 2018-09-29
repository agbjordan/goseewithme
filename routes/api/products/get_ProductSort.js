//model
const Products = require("../../../models/Products");

//validation
const validate = require("../../../validation/products/get_ProductSort");

module.exports = function get(req, res) {
  const { errors, isValid } = validate(req.params);
  let errors = {};
  const msg = {
    productNotFound: "Product was not found",
    productError: "Could not find product",
    collectionError: "Could not connect to database",
    Sort: "The limit must be a number between 1 and 300"
  };

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  sortBy = sort => {
    if (sort) {
      switch (sort) {
        case "name":
          sortby = "name";
          break;
        case "date":
          sortby = "lastUpdated";
          break;
        case "status":
          sortby = "status";
          break;
        case "country":
          sortby = "country";
          break;
        case "city":
          sortby = "city";
          break;
        case "price":
          sortby = "lowestPrice";
          break;
        default:
          sortby = "name";
      }
    }
    return sortby;
  };

  //run the switch to find the current profile
  Products.find()
    .sort(sortBy(req.params.sort))
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

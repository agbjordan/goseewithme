const Products = require("../../../models/Products");

module.exports = function get(req, res) {
  let errors = {};
  const msg = {
    userNotFound: "The current user could not be identified",
    productNotFound: "No products where found",
    productError: "Could not collect products",
    Sort: "The limit must be a number between 1 and 300"
  };

  // User role could not be found
  if (!req.params.id) {
    errors.userNotFound = msg.userNotFound;
    return res.status(404).json(errors);
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
  const objId = new ObjectId(req.params.id);

  Products.find({
    $or: [{ agentId: objId }, { objId: { $in: guideIds } }]
  })
    .sort(sortBy(req.params.sort))
    .then(Products => {
      if (Products) {
        if (!Products[0]) {
          errors.productNotFound = msg.productNotFound;
          return res.status(200).json(errors);
        }
        return res.status(200).json(Products);
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

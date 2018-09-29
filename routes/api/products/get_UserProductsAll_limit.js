const Products = require("../../../models/Products");

module.exports = function get(req, res) {
  let errors = {};
  let limit = 100;
  let limit_min = 1;
  let limit_max = 300;
  let limit_base = 10;
  const msg = {
    userNotFound: "The current user could not be identified",
    productNotFound: "No products where found",
    productError: "Could not collect products",
    limitNotNumber: "The limit must be a number between 1 and 300"
  };

  // User role could not be found
  if (!req.params.id) {
    errors.userNotFound = msg.userNotFound;
    return res.status(404).json(errors);
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
  const objId = new ObjectId(req.params.id);

  Products.find({
    $or: [{ agentId: objId }, { objId: { $in: guideIds } }]
  })
    .limit(limit)
    .sort({ name })
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

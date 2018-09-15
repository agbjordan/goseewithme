const Reviews = require("../../../models/Reviews");

module.exports = function get(req, res) {
  let errors = {};
  let limit = 100;
  let limit_min = 1;
  let limit_max = 300;
  let limit_base = 10;
  const msg = {
    reviewNotFound: "No reviews where found",
    reviewError: "Could not collect reviews",
    limitNotNumber: "The limit must be a number between 1 and 300"
  };

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
  Reviews.find()
    .limit(limit)
    .sort({ date: -1 })
    .then(reviews => {
      if (reviews) {
        if (!reviews[0]) {
          errors.reviewNotFound = msg.reviewNotFound;
          return res.status(200).json(errors);
        }
        return res.status(200).json(reviews);
      } else {
        errors.reviewNotFound = msg.reviewNotFound;
        return res.status(200).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
      errors.reviewError = msg.reviewError;
      return res.status(400).json(errors);
    });
};

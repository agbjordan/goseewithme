//Model
const Reviews = require("../../../models/Reviews");

//validation
const validate = require("../../../validation/reviews/get_UserReview");

module.exports = function get(req, res) {
  const { errors, isValid } = validate(req.params);
  const msg = {
    reviewNotFound: "No reviews where found",
    reviewError: "Could not collect reviews",
    statusNotFound: "Status is not set",
    statusInvalid: "Status is invalid"
  };
  const statusOptions = ["inactive", "active", "highlight", "banned"];

  //validate status
  if (!req.params.status) {
    errors.statusNotFound = msg.statusNotFound;
    return res.status(400).json(errors);
  }
  if (!statusOptions.includes(req.params.status)) {
    errors.statusInvalid = msg.statusInvalid;
    return res.status(400).json(errors);
  }

  //run the switch to find the current profile
  Reviews.find({ user: req.params.id, status: trim(req.params.status) })
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

//model
const Reviews = require("../../../models/Reviews");

//validation
const validate = require("../../../validation/reviews/get_ReviewById");

module.exports = function get(req, res) {
  const { errors, isValid } = validate(req.params);
  const msg = {
    userNotFound: "The current user could not be identified",
    reviewNotFound: "No reviews where found",
    reviewError: "Could not collect reviews"
  };

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = msg.userNotFound;
    return res.status(404).json(errors);
  }

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //run the switch to find the current profile
  Reviews.findOne({ user: req.user._id, _id: req.params.reviewID })
    .sort({ date: -1 })
    .then(review => {
      if (review) {
        if (!review[0]) {
          errors.reviewNotFound = msg.reviewNotFound;
          return res.status(200).json(errors);
        }
        return res.status(200).json(review);
      } else {
        errors.reviewError = msg.reviewError;
        return res.status(404).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
      errors.userNotFound = msg.userNotFound;
      return res.status(400).json(errors);
    });
};

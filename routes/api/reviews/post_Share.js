//models
const Reviews = require("../../../models/Reviews");

//validation
const validate = require("../../../validation/reviews/likereview");

module.exports = function get(req, res) {
  //defaults
  const { errors, isValid } = validate(req.params);
  const msg = {
    userNotFound: "The current user could not be identified",
    reviewNotFound: "no reviews where found",
    likeNotFound: "like was not updated"
  };

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //run the switch to find the current profile
  Reviews.findByIdAndUpdate({ _id: req.params.id }, { $inc: { shares: 1 } })
    .then(review => {
      return res.status(200).json(review);
    })
    .catch(err => {
      console.log(err);
      errors.reviewNotFound = msg.reviewNotFound;
      return res.status(400).json(errors);
    });
};

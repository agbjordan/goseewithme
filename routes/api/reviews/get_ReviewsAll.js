const Reviews = require("../../../models/Reviews");

module.exports = function get(req, res) {
  let errors = {};
  const msg = {
    reviewNotFound: "No reviews where found",
    reviewError: "Could not collect reviews"
  };

  //run the switch to find the current profile
  Reviews.find()
    .sort({ name })
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

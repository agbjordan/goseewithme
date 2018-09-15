//models
const Reviews = require("../../../models/Reviews");

//validation
const validate = require("../../../validation/reviews/likePost");

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
  Reviews.findById({ _id: req.params.id })
    .then(review => {
      //review is there
      //now check if the user has already liked this review
      if (
        review.likes.filter(
          like => like.user.toString() === req.user._id.toString()
        ).length > 0
      ) {
        //unlike this review
        //remove user id from like array
        const removeIndex = review.likes
          .map(item => item.user.toString())
          .indexOf(req.user._id);
        review.likes.splice(removeIndex, 1);

        //update record
        review
          .save()
          .then(review => res.json(review))
          .catch(err => {
            console.log(err);
            errors.likeNotFound = msg.likeNotFound;
            return res.status(400).json(errors);
          });
      } else {
        //like this review
        //add user id to like array
        review.likes.unshift({ user: req.user._id });

        //update record
        review
          .save()
          .then(review => res.json(review))
          .catch(err => {
            console.log(err);
            errors.likeNotFound = msg.likeNotFound;
            return res.status(400).json(errors);
          });
      }
    })
    .catch(err => {
      console.log(err);
      errors.reviewNotFound = msg.reviewNotFound;
      return res.status(400).json(errors);
    });
};

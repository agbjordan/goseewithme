//models
const Reviews = require("../../../models/Reviews");

//validation
const validate = require("../../../validation/reviews/createComment");

module.exports = function get(req, res) {
  //defaults
  const valid = new validate();
  const errors = {};
  const { errorsParams, isValidParams } = valid.validateParams(req.params);
  const { errorsBody, isValidBody } = valid.validateBody(req.body);
  const msg = {
    userNotFound: "The current user could not be identified",
    reviewNotFound: "no reviews where found",
    commentFailed: "comment was not added"
  };

  //validate
  if (!isValidParams) {
    return res.status(400).json(errorsParams);
  }
  if (!isValidBody) {
    return res.status(400).json(errorsBody);
  }

  Reviews.findById({ _id: req.params.id })
    .then(review => {
      if (review) {
        //new comment
        const newComment = {
          text: req.body.text,
          author: req.body.author,
          avatar: req.body.avatar,
          user: req.user._id
        };

        //add to comments array
        review.comments.unshift(newComment);
        //update record
        review
          .save()
          .then(review => res.json(review))
          .catch(err => {
            console.log(err);
            errors.commentFailed = msg.commentFailed;
            return res.status(400).json(errors);
          });
      } else {
        errors.reviewNotFound = msg.reviewNotFound;
        return res.status(200).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
      errors.userNotFound = msg.userNotFound;
      return res.status(400).json(errors);
    });
};

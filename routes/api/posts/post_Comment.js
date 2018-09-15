//models
const Posts = require("../../../models/Posts");

//validation
const validate = require("../../../validation/posts/createComment");

module.exports = function get(req, res) {
  //defaults
  const valid = new validate();
  const errors = {};
  const { errorsParams, isValidParams } = valid.validateParams(req.params);
  const { errorsBody, isValidBody } = valid.validateBody(req.body);
  const msg = {
    userNotFound: "The current user could not be identified",
    postNotFound: "no posts where found",
    commentFailed: "comment was not added"
  };

  //validate
  if (!isValidParams) {
    return res.status(400).json(errorsParams);
  }
  if (!isValidBody) {
    return res.status(400).json(errorsBody);
  }

  Posts.findById({ _id: req.params.id })
    .then(post => {
      if (post) {
        //new comment
        const newComment = {
          text: req.body.text,
          author: req.body.author,
          avatar: req.body.avatar,
          user: req.user._id
        };

        //add to comments array
        post.comments.unshift(newComment);
        //update record
        post
          .save()
          .then(post => res.json(post))
          .catch(err => {
            console.log(err);
            errors.commentFailed = msg.commentFailed;
            return res.status(400).json(errors);
          });
      } else {
        errors.postNotFound = msg.postNotFound;
        return res.status(200).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
      errors.userNotFound = msg.userNotFound;
      return res.status(400).json(errors);
    });
};

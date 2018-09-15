//models
const Posts = require("../../../models/Posts");

//validation
const validate = require("../../../validation/posts/deleteComment");

module.exports = function get(req, res) {
  //defaults
  const { errors, isValid } = validate(req.params);
  const msg = {
    userNotFound: "The current user could not be identified",
    postNotFound: "no posts where found",
    commentNotFound: "comment could not be found",
    commentNotDelete: "comment could not be deleted"
  };

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //get post
  Posts.findOne({ _id: req.params.id })
    .then(post => {
      //Post is there
      //now get all the comments that are owned by this user
      if (
        post.comments.filter(
          comment => comment.user.toString() === req.user._id.toString()
        ).length > 0
      ) {
        //remove the comment from the array
        //find the index of the comment that holds the comment id
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.cid);

        if (removeIndex < 0) {
          //no comment was found with this id
          errors.commentNotFound = msg.commentNotFound;
          return res.status(400).json(errors);
        } else {
          //update record
          post.comments.splice(removeIndex, 1);
          post
            .save()
            .then(post => res.json(post))
            .catch(err => {
              console.log(err);
              errors.commentNotFound = msg.commentNotFound;
              return res.status(400).json(errors);
            });
        }
      } else {
        errors.commentNotDelete = msg.commentNotDelete;
        return res.status(400).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
      errors.postNotFound = msg.postNotFound;
      return res.status(400).json(errors);
    });
};

//models
const Posts = require("../../../models/Posts");

//validation
const validate = require("../../../validation/posts/likePost");

module.exports = function get(req, res) {
  //defaults
  const { errors, isValid } = validate(req.params);
  const msg = {
    userNotFound: "The current user could not be identified",
    postNotFound: "no posts where found",
    likeNotFound: "like was not updated"
  };

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //run the switch to find the current profile
  Posts.findById({ _id: req.params.id })
    .then(post => {
      //Post is there
      //now check if the user has already liked this post
      if (
        post.likes.filter(
          like => like.user.toString() === req.user._id.toString()
        ).length > 0
      ) {
        //unlike this post
        //remove user id from like array
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user._id);
        post.likes.splice(removeIndex, 1);

        //update record
        post
          .save()
          .then(post => res.json(post))
          .catch(err => {
            console.log(err);
            errors.likeNotFound = msg.likeNotFound;
            return res.status(400).json(errors);
          });
      } else {
        //like this post
        //add user id to like array
        post.likes.unshift({ user: req.user._id });

        //update record
        post
          .save()
          .then(post => res.json(post))
          .catch(err => {
            console.log(err);
            errors.likeNotFound = msg.likeNotFound;
            return res.status(400).json(errors);
          });
      }
    })
    .catch(err => {
      console.log(err);
      errors.postNotFound = msg.postNotFound;
      return res.status(400).json(errors);
    });
};

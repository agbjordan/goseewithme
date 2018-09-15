//model
const Posts = require("../../../models/Posts");

//validation
const validate = require("../../../validation/posts/get_PostsById");

module.exports = function get(req, res) {
  const { errors, isValid } = validate(req.params);
  const msg = {
    userNotFound: "The current user could not be identified",
    postNotFound: "no posts where found"
  };

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //run the switch to find the current profile
  Posts.find({ _id: req.params.id })
    .select("shares")
    .sort({ date: -1 })
    .then(posts => {
      if (posts) {
        if (!posts[0]) {
          errors.postNotFound = msg.postNotFound;
          return res.status(200).json(errors);
        }
        return res.status(200).json(posts);
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

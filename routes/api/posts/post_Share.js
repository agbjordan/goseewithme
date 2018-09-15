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
  Posts.findByIdAndUpdate({ _id: req.params.id }, { $inc: { shares: 1 } })
    .then(post => {
      return res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      errors.postNotFound = msg.postNotFound;
      return res.status(400).json(errors);
    });
};

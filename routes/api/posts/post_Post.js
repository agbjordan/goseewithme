//models
const Posts = require("../../../models/Posts");

//validation
const validate = require("../../../validation/posts/createPost");

module.exports = function get(req, res) {
  //defaults
  const { errors, isValid } = validate(req.body);

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //new post
  const newPost = new Posts({
    text: req.body.text,
    author: req.body.author,
    avatar: req.body.avatar,
    user: req.user._id
  });

  //save post
  newPost.save().then(post => {
    return res.json(post);
  });
};

//models
const Reviews = require("../../../models/Reviews");

//validation
const validate = require("../../../validation/reviews/createPost");

module.exports = function get(req, res) {
  //defaults
  const { errors, isValid } = validate(req.body);

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //new Review
  const newReview = new Reviews({
    productType: req.body.productType,
    productID: req.body.productID,
    text: req.body.text,
    status: req.body.status,
    rating: req.body.rating,
    title: req.body.title,
    author: req.user.name,
    avatar: req.user.avatar,
    user: req.user._id
  });

  //save Review
  newReview.save().then(post => {
    return res.json(post);
  });
};

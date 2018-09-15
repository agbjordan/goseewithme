//load models
const Reviews = require("../../../models/Reviews");

//validation
const validate = require("../../../validation/reviews/deletePost");

module.exports = function deletePost(req, res) {
  const { errors, isValid } = validate(req.body);
  const msg = {
    postNotFound: "Post could not be found",
    postNotDelete: "Post could not be deleted",
    postDeleted: "Post has been deleted"
  };

  //validate
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Reviews.findOneAndRemove({ user: req.user._id, _id: req.body.id })
    .then(result => {
      return res.status(200).json(msg.postDeleted);
    })
    .catch(err => {
      console.log(err);
      errors.postNotDelete = msg.postNotDelete;
      return res.status(400).json(errors);
    });
};

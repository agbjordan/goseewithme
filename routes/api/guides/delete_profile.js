//load models
const GuideProfile = require("../../../models/GuideProfiles");

module.exports = function delet_GuidesProfile(req, res) {
  let errors = {};

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = "The current user could not be identified";
    return res.status(404).json(errors);
  }

  //find user profile
  GuideProfile.findOneAndRemove({ user: req.user._id })
    .then(profile => {
      msg = "The current users profile has been removed";
      return res.status(200).json(msg);
    })
    .catch(err => console.log(err));
};

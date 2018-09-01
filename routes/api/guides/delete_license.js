//load models
const GuideProfile = require("../../../models/GuideProfiles");

module.exports = function delete_GuidesLicense(req, res) {
  let errors = {};

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = "The current user could not be identified";
    return res.status(404).json(errors);
  } else if (req.user.role !== "guide") {
    errors.userNotGuide =
      "The current user is not a tour guide and thus can not have a guide license";
    return res.status(404).json(errors);
  }

  //find user profile
  GuideProfile.findOneAndUpdate(
    { user: req.user._id },
    {
      $unset: { license: {} }
    }
  )
    .then(profile => {
      msg = "The current users guide license has been removed";
      return res.status(200).json(msg);
    })
    .catch(err => console.log(err));
};

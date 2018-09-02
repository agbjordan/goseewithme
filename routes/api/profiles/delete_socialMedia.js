module.exports = function delete_Newsletter(req, res) {
  let errors = {};
  let Proile = "";
  const userNotFound = "The current user could not be identified";
  const msg = "The current users social media accounts have been reset";

  //load models depending on current User Role
  switch (req.user.role) {
    case "guide":
      Profile = require("../../../models/GuideProfiles");
      break;
    case "agent":
      Profile = require("../../../models/AgentProfiles");
      break;
    default:
      Profile = require("../../../models/TravellerProfiles");
  }

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = userNotFound;
    return res.status(404).json(errors);
  }

  //find user profile
  Profile.findOneAndUpdate(
    { user: req.user._id },
    {
      $unset: { socialMedia: {} }
    }
  )
    .then(profile => {
      return res.status(200).json(msg);
    })
    .catch(err => console.log(err));
};

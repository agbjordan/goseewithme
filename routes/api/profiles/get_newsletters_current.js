module.exports = function get_Newsletter_current(req, res) {
  let errors = {};
  let ProfileModel = "";
  const dataGroup = "newsletters";
  const userNotFound = "The current user could not be identified";
  const msg = "The Current User has not set up their newsletter options";

  //load models depending on current User Role
  switch (req.user.role) {
    case "guide":
      ProfileModel = require("../../../models/GuideProfiles");
      break;
    case "agent":
      ProfileModel = require("../../../models/AgentProfiles");
      break;
    default:
      ProfileModel = require("../../../models/TravellerProfiles");
  }

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = userNotFound;
    return res.status(404).json(errors);
  }

  //use switch to get correct profile
  function getNewsletterByUserID(userid) {
    return ProfileModel.findOne({ user: userid }, dataGroup)
      .then(results => {
        return results;
      })
      .catch(err => console.log(err));
  }

  //run the switch to find the current profile
  let dataResults = getNewsletterByUserID(req.user._id);
  dataResults.then(function(result) {
    //no profiles found
    let r = result.toJSON();
    if (!r[dataGroup]) {
      return res.status(200).json(msg);
    }

    //profile found
    return res.status(200).json(result);
  });
};

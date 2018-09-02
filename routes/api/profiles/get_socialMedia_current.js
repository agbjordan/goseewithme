module.exports = function get_Newsletter_current(req, res) {
  let errors = {};
  let Profile = "";
  const dataGroup = "socialMedia";
  const userNotFound = "The current user could not be identified";
  const msg = "The Current User has not set up their social media accounts";

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

  //use switch to get correct profile
  function getByUserID(userid) {
    return Profile.findOne({ user: userid }, dataGroup)
      .then(results => {
        return results;
      })
      .catch(err => console.log(err));
  }

  //run the switch to find the current profile
  let dataResults = getByUserID(req.user._id);
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

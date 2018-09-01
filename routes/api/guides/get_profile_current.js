const GuideProfile = require("../../../models/GuideProfiles");

module.exports = function get_GuidesProfile_current(req, res) {
  let errors = {};

  // User role could not be found
  if (!req.user.role) {
    errors.roleNotFound = "The current users role could not be identified";
    return res.status(404).json(errors);
  }

  //use switch to get correct profile
  function getProfileByRole(role) {
    switch (role) {
      //GUIDES
      case "guide": //guide
        return GuideProfile.findOne({ user: req.user._id })
          .then(profile => {
            return profile;
          })
          .catch(err => console.log(err));
      //AGENTS
      case "agent": //agent
        return AgentProfile.findOne({ user: req.user._id })
          .then(profile => {
            return profile;
          })
          .catch(err => console.log(err));
      default:
        //TRAVELLERS
        return TravellerProfile.findOne({ user: req.user._id })
          .then(profile => {
            return profile;
          })
          .catch(err => console.log(err));
    }
  }

  //run the switch to find the current profile
  let userProfile = getProfileByRole(req.user.role);
  userProfile.then(function(result) {
    //no profiles found
    if (!userProfile || result === null) {
      let msg = "The Current User has not set up a profile";
      return res.status(200).json(msg);
    }

    //profile found
    return res.status(200).json(result);
  });
};

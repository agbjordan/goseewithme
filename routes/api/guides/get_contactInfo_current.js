const GuideProfile = require("../../../models/GuideProfiles");
const is_Empty = require("../../../validation/is_Empty");

module.exports = function get_GuidesContactInfo_current(req, res) {
  let errors = {};

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = "The current user could not be identified";
    return res.status(404).json(errors);
  }

  //use switch to get correct profile
  function getGuideContactInfoByUserID(userid) {
    return GuideProfile.findOne({ user: userid }, "contactInfo")
      .then(contactInfo => {
        return contactInfo;
      })
      .catch(err => console.log(err));
  }

  //run the switch to find the current profile
  let guideContactInfo = getGuideContactInfoByUserID(req.user._id);
  guideContactInfo.then(function(result) {
    //no profiles found
    let r = result.toJSON();
    if (!r.contactInfo) {
      let msg = "The Current User has not set up any contact information";
      return res.status(200).json(msg);
    }

    //profile found
    return res.status(200).json(result);
  });
};

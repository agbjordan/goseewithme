const GuideProfile = require("../../../models/GuideProfiles");

module.exports = function get_GuidesLicense_current(req, res) {
  let errors = {};

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = "The current user could not be identified";
    return res.status(404).json(errors);
  }

  //use switch to get correct profile
  function getGuideLicenseByUserID(userid) {
    return GuideProfile.findOne({ user: userid }, "license")
      .then(license => {
        return license;
      })
      .catch(err => console.log(err));
  }

  //run the switch to find the current profile
  let guideLicense = getGuideLicenseByUserID(req.user._id);
  guideLicense.then(function(result) {
    //no profiles found
    if (!guideLicense || result === null) {
      let msg = "The Current User has not set up a guide license";
      return res.status(200).json(msg);
    }

    //profile found
    return res.status(200).json(result);
  });
};

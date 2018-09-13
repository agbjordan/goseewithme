//functions
const selectModel = require("../../../functions/modelFunctions");
const userFunctions = require("../../../functions/userFunctions");

module.exports = function get_GuidesLicense_current(req, res) {
  let errors = {};
  const user = new userFunctions();
  const dataGroup = "license";
  const userRole = "guide";
  const msg = {
    userNotFound: "The current user could not be identified",
    userNotGuide: "The current user is not a guide.",
    noLicense: "The Current User has not set up a guide license"
  };

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = msg.userNotFound;
    return res.status(404).json(errors);
  } else if (!req.user.role || req.user.role !== userRole) {
    errors.userNotGuide = msg.userNotGuide;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  let Profile = selectModel(req.user.role);

  let profileUser = user.getByUserID({
    userid: req.user._id,
    model: Profile,
    data: dataGroup
  });

  profileUser.then(result => {
    if (!result) {
      return res.status(200).json(msg.noLicense);
    }
    return res.status(200).json(result);
  });

  profileUser.catch(err => {
    res.status(200).json(msg.noLicense);
    console.log(err);
  });
};

//functions
const selectModel = require("../../../functions/modelFunctions");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = function deleteLicense(req, res) {
  let errors = {};
  const updateSet = new dbFunctions();
  const dataGroup = "license";
  const userRole = "guide";
  const msg = {
    userNotFound: "The current user could not be identified",
    userNotGuide: "The current user is not a guide.",
    removed: "The current users guide license has been removed"
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

  //find user profile and unset
  updateSet.unset({
    model: Profile,
    userid: req.user._id,
    objectName: dataGroup,
    res: res,
    msg: msg.removed
  });
};

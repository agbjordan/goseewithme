//load models
const selectModel = require("../../../functions/selectModel");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = function deleteLicense(req, res) {
  let errors = {};
  const updateSet = new dbFunctions();
  const props = {
    dataGroup: "license",
    userRole: "guide",
    userNotFound: "The current user could not be identified",
    userNotGuide: "The current user is not a guide.",
    msg: "The current users guide license has been removed"
  };

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = props.userNotFound;
    return res.status(404).json(errors);
  } else if (!req.user.role || req.user.role !== props.userRole) {
    errors.userNotGuide = props.userNotGuide;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  let Profile = selectModel(req.user.role);

  //find user profile and unset
  updateSet.unset({
    model: Profile,
    userid: req.user._id,
    objectName: props.dataGroup,
    res: res,
    msg: props.msg
  });
};

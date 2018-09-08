//load models
const selectModel = require("../../../functions/selectModel");
const userFunctions = require("../../../functions/userFunctions");

module.exports = function delet_GuidesProfile(req, res) {
  let errors = {};
  const user = new userFunctions();
  const props = {
    userNotFound: "The current user could not be identified",
    roleNotFound: "The current user's role could not be identified",
    msg: "The current users profile has been removed"
  };

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = props.userNotFound;
    return res.status(404).json(errors);
  } else if (!req.user.role) {
    errors.roleNotFound = props.roleNotFound;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  let Profile = selectModel(req.user.role);

  //find user profile and remove
  updateSet.remove({
    model: Profile,
    userid: req.user._id,
    res: res,
    msg: msg
  });
};

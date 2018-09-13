//load models
const selectModel = require("../../../functions/modelFunctions");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = function deleteProfile(req, res) {
  let errors = {};
  const dbSet = new dbFunctions();
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
  dbSet.remove({
    model: Profile,
    userid: req.user._id,
    res: res,
    msg: props.msg
  });
};

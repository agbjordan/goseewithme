//functions
const selectModel = require("../../../functions/modelFunctions");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = function del(req, res) {
  let errors = {};
  const updateSet = new dbFunctions();
  const dataGroup = "socialMedia";
  const userNotFound = "The current user could not be identified";
  const msg = "The current users social media accounts have been reset";

  //load models depending on current User Role
  let Profile = selectModel(req.user.role);

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = userNotFound;
    return res.status(404).json(errors);
  }

  //find user profile and unset
  updateSet.unset({
    model: Profile,
    userid: req.user._id,
    objectName: dataGroup,
    res: res,
    msg: msg
  });
};

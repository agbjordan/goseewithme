const selectModel = require("../../../functions/selectModel");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = delete_Languages = (req, res) => {
  let errors = {};
  const updateSet = new dbFunctions();
  const dataGroup = "languages";
  const userNotFound = "The current user could not be identified";
  const msg = "The current users languages settings have been removed";

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

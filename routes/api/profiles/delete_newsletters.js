const selectModel = require("../../../functions/selectModel");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = function del(req, res) {
  let errors = {};
  const updateSet = new dbFunctions();
  const dataGroupName = "newsletters";
  const userNotFound = "The current user could not be identified";
  const msg = "The current users newsletter options have been reset";

  let dataDefaults = {
    proudctNews: false,
    websiteNews: false,
    agentNews: false,
    guideNews: false,
    competitionNews: false
  };

  //load models depending on current User Role
  let Profile = selectModel(req.user.role);

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = userNotFound;
    return res.status(404).json(errors);
  }

  //find user profile and set defaults
  updateSet.set({
    model: Profile,
    userid: req.user._id,
    data: dataDefaults,
    objectName: dataGroupName,
    res: res,
    msg: msg
  });
};

const selectModel = require("../../../functions/selectModel");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = get = (req, res) => {
  let errors = {};
  const getSet = new dbFunctions();
  const dataGroup = "follows";
  const userNotFound = "The current user could not be identified";
  const msg = "The current users following list could not be found";

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = userNotFound;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  let Profile = selectModel(req.user.role);

  //find follows list
  getSet
    .get({
      model: Profile,
      userid: req.user._id,
      objectName: dataGroup,
      res: res
    })
    .then(follows => {
      return res.status(200).json(follows);
    })
    .catch(err => {
      return res.status(400).json(msg);
    });
};

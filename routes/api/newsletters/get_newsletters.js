const selectModel = require("../../../functions/modelFunctions");
const userFunctions = require("../../../functions/userFunctions");

module.exports = function get(req, res) {
  let errors = {};
  let Profile = "";
  const user = new userFunctions();
  const dataGroup = "newsletters";
  const userNotFound = "The current user could not be identified";
  const msg = "The Current User has not set up their newsletter options";

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = userNotFound;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  Profile = selectModel(req.user.role);

  //run the switch to find the current profile
  let profileUser = user.getByUserID({
    userid: req.user._id,
    model: Profile,
    data: dataGroup
  });

  profileUser.then(result => {
    let r = result.toJSON();
    if (!r[dataGroup]) {
      return res.status(200).json(msg);
    }
    return res.status(200).json(result);
  });

  profileUser.catch(err => {
    res.status(200).json(userNotFound);
    console.log(err);
  });
};

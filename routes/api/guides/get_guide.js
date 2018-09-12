//functions
const selectModel = require("../../../functions/modelFunctions");
const userFunctions = require("../../../functions/userFunctions");

module.exports = function getCurrentProfile(req, res) {
  let errors = {};
  const user = new userFunctions();
  const props = {
    roleNotFound: "The current users role could not be identified",
    userNotFound: "The current users could not be identified",
    msg: "The Current User has not set up a profile"
  };

  // User role could not be found
  if (!req.user.role) {
    errors.roleNotFound = props.roleNotFound;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  let Profile = selectModel(req.user.role);

  user
    .getByUserID({
      userid: req.user._id,
      model: Profile
    })
    .then(result => {
      if (!result) {
        return res.status(200).json(msg);
      }
      return res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(404).json(msg.userNotFound);
    });
};

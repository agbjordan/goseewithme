//functions
const selectModel = require("../../../functions/modelFunctions");
const userFunctions = require("../../../functions/userFunctions");

module.exports = function getCurrentProfile(req, res) {
  let errors = {};
  const user = new userFunctions();
  const props = {
    roleNotFound: "The current users role could not be identified",
    userNotFound: "The current user could not be identified",
    msg: "The current user has not set up a profile"
  };

  // User role could not be found
  if (!req.user.role) {
    errors.roleNotFound = props.roleNotFound;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  let Profile = selectModel(req.user.role);

  let profileUser = user.getByUserID({
    userid: req.user._id,
    model: Profile
  });

  //return promise
  profileUser.then(result => {
    if (!result) {
      return res.status(200).json(props.msg);
    }
    return res.status(200).json(result);
  });

  //catch errors
  profileUser.catch(err => {
    console.log(err);
    return res.status(404).json(props.userNotFound);
  });
};

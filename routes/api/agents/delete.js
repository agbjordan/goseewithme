//load models
const selectModel = require("../../../functions/modelFunctions");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = function deleteProfile(req, res) {
  let errors = {};
  const dbSet = new dbFunctions();
  const props = {
    userNotFound: "The current user could not be identified",
    profileNotFound: "The current user profile could not be identified",
    roleNotFound: "The current user's role could not be identified",
    msg: "The current users profile has been removed"
  };

  function checkEmpty(e) {
    if (!e || e === "undefined") {
      return false;
    }
    return true;
  }

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
  let profileUser = dbSet.remove({
    model: Profile,
    userid: req.user._id
  });

  //return promise
  profileUser.then(result => {
    if (result) {
      return res.status(200).json(props.msg);
    } else {
      return res.status(400).json(props.profileNotFound);
    }
  });

  //catch error
  profileUser.catch(err => {
    console.log(err);
    errors.notRemoved = "Profile could not be removed";
    return res.status(400).json(errors);
  });
};

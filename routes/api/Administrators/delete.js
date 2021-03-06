//load models//require models
const Profile = require("../../../models/Administrators");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = function deleteProfile(req, res) {
  let errors = {};
  const dbSet = new dbFunctions();
  const props = {
    userNotFound: "The current user could not be identified",
    profileNotFound: "The Administrator could not be identified",
    roleNotFound: "No Administrator ID was Received",
    idNotValid: "Received Administrator ID is not Valid, must be 24 characters",
    msg: "The Administrator has been removed"
  };

  //find user profile and remove
  let profileUser = dbSet.remove({
    model: Profile,
    userid: req.params.id
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
    errors.notRemoved = "The Administrator could not be removed";
    return res.status(400).json(errors);
  });
};

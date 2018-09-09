const UsersModel = require("../../../models/Users");
const selectModel = require("../../../functions/selectModel");
const profileFunctions = require("../../../functions/profileFunctions");
const userFunctions = require("../../../functions/userFunctions");
const validator = require("validator");

module.exports = get = (req, res) => {
  let errors = {};
  const getSet = new profileFunctions();
  const userSet = new userFunctions();
  const userNotFound = "The user could not be identified";
  const msg = "The users following list could not be found";
  const noUserID = "User ID not present";
  const typeError = "User ID is not a string";
  const lengthError = "User ID is not a valid length";
  const regexError = "User ID is not a valid format";
  const regex = new RegExp("^[a-zA-Z0-9]*$");

  //validate userID
  if (!req.params.id) {
    errors.noUserID = noUserID;
    return res.status(404).json(errors);
  }
  if (typeof req.params.id !== "string") {
    errors.typeError = typeError;
    return res.status(404).json(errors);
  }
  if (!validator.isLength(req.params.id, { min: 24, max: 24 })) {
    errors.lengthError = lengthError;
    return res.status(404).json(errors);
  }
  if (!validator.matches(req.params.id, regex)) {
    errors.regexError = regexError;
    return res.status(404).json(errors);
  }

  //check user exists and return values
  let user = userSet.getUserFromUserID({
    userid: req.params.id,
    model: UsersModel,
    data: ["role", "_id", "name"]
  });

  user.then(results => {
    // User not found
    if (!results || typeof results === "undefined") {
      errors.userNotFound = userNotFound;
      return res.status(404).json(errors);
    }

    //check the user role and id a present
    const user = results[0];
    if (!user._id || !user.role) {
      errors.userNotFound = userNotFound;
      return res.status(404).json(errors);
    }

    //load models depending on User Role
    let Profile = selectModel(user.role);

    //find follows list
    getSet
      .getFollows({
        model: Profile,
        userid: req.params.id
      })
      .then(follows => {
        return res.status(200).json(follows);
      })
      .catch(err => {
        return res.status(400).json(msg);
      });
  });
};

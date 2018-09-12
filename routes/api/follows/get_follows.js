//models
const UsersModel = require("../../../models/Users");

//functions
const selectModel = require("../../../functions/modelFunctions");
const profileFunctions = require("../../../functions/profileFunctions");
const userFunctions = require("../../../functions/userFunctions");

//validation
const validator = require("validator");

module.exports = get = (req, res) => {
  //defaults
  let errors = {};
  const getSet = new profileFunctions();
  const userSet = new userFunctions();
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  const msg = {
    userNotFound: "The user could not be identified",
    listNotFound: "The users following list could not be found",
    noUserID: "User ID not present",
    typeError: "User ID is not a string",
    lengthError: "User ID is not a valid length",
    regexError: "User ID is not a valid format"
  };

  //validate userID
  if (!req.params.id) {
    errors.noUserID = msg.noUserID;
    return res.status(404).json(errors);
  }
  if (typeof req.params.id !== "string") {
    errors.typeError = msg.typeError;
    return res.status(404).json(errors);
  }
  if (!validator.isLength(req.params.id, { min: 24, max: 24 })) {
    errors.lengthError = msg.lengthError;
    return res.status(404).json(errors);
  }
  if (!validator.matches(req.params.id, regex)) {
    errors.regexError = msg.regexError;
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
      errors.userNotFound = msg.userNotFound;
      return res.status(404).json(errors);
    }

    //check the user role and id a present
    if (!results._id || !results.role) {
      errors.userNotFound = msg.userNotFound;
      return res.status(404).json(errors);
    }

    //load models depending on User Role
    let Profile = selectModel(results.role);

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
        return res.status(400).json(msg.listNotFound);
      });
  });
};

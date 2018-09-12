//functions
const selectModel = require("../../../functions/modelFunctions");
const profileFunctions = require("../../../functions/profileFunctions");

//validation
const validator = require("validator");

module.exports = get = (req, res) => {
  //defaults
  let errors = {};
  let userRole = "guide";
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  const userSet = new profileFunctions();
  const msg = {
    userNotFound: "The user could not be identified",
    listNotFound: "The users social media list could not be found",
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

  //load models depending on userRole
  let Profile = selectModel(userRole);

  userSet
    .getSocialMedia({
      userid: req.params.id,
      model: Profile
    })
    .then(result => {
      if (!result) {
        return res.status(200).json(msg.userNotFound);
      }
      return res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(404).json(msg.userNotFound);
    });
};

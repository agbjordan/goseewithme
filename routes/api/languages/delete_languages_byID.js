//functions
const selectModel = require("../../../functions/modelFunctions");
const profileFunctions = require("../../../functions/profileFunctions");
const dbFunctions = require("../../../functions/dbFunctions");
const arrayFunctions = require("../../../functions/arrayFunctions");

//validator
const validator = require("validator");

//class
module.exports = get = (req, res) => {
  let errors = {};
  const dataGroup = "languages";
  const getSet = new profileFunctions();
  const dbSet = new dbFunctions();
  const arraySet = new arrayFunctions();
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  const msg = {
    userCurrentNotFound: "The current user could not be identified",
    listNotFound: "The current users langauge list could not be found",
    userIDAlready: "Requested Language is not present",
    userIDRemoved: "Request Language has been removed",
    noUserID: "User ID not present",
    typeError: "User ID is not a string",
    lengthError: "User ID is not a valid length",
    regexError: "User ID is not a valid format"
  };

  //validation
  if (!req.user._id) {
    errors.userCurrentNotFound = msg.userCurrentNotFound;
    return res.status(404).json(errors);
  }
  if (!req.body.languageID) {
    errors.noUserID = msg.noUserID;
    return res.status(404).json(errors);
  }
  if (typeof req.body.languageID !== "string") {
    errors.typeError = msg.typeError;
    return res.status(404).json(errors);
  }
  if (!validator.isLength(req.body.languageID, { min: 24, max: 24 })) {
    errors.lengthError = msg.lengthError;
    return res.status(404).json(errors);
  }
  if (!validator.matches(req.body.languageID, regex)) {
    errors.regexError = msg.regexError;
    return res.status(404).json(errors);
  }

  //load models depending on User Role
  let Profile = selectModel(req.user.role);

  //find follows list of current user
  let languagesArray = getSet.getLanguages({
    model: Profile,
    userid: req.user._id
  });

  languagesArray.then(result => {
    //check list exists
    if (!result || typeof result === "undefined") {
      errors.listNotFound = msg.listNotFound;
      return res.status(404).json(errors);
    }

    const currentLen = result[dataGroup].length;
    const newArray = [];

    //loop through the current langauges
    //only add the languages that have not
    //been requested to be remove
    for (var i = 0; i < currentLen; i++) {
      if (result[dataGroup][i]._id.toString() !== req.body.languageID) {
        newArray.push(result[dataGroup][i]);
      }
    }
    //save new array to db
    dbSet.set({
      model: Profile,
      userid: req.user._id,
      objectName: dataGroup,
      data: newArray,
      res: res,
      msg: msg.userIDRemoved
    });
  });

  languagesArray.catch(err => {
    return res.status(400).json(err);
  });
};

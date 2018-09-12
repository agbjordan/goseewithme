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
  const dateGroup = "followers";
  const getSet = new profileFunctions();
  const dbSet = new dbFunctions();
  const arraySet = new arrayFunctions();
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  const msg = {
    userCurrentNotFound: "The current user could not be identified",
    listNotFound: "The current users followers list could not be found",
    userIDAlready: "This user is not a follower",
    userIDRemoved: "This user has been removed",
    noUserID: "User ID not present",
    typeError: "User ID is not a string",
    lengthError: "User ID is not a valid length",
    regexError: "User ID is not a valid format"
  };

  //validation
  if (!req.body.followerID) {
    errors.noUserID = msg.noUserID;
    return res.status(404).json(errors);
  }
  if (typeof req.body.followerID !== "string") {
    errors.typeError = msg.typeError;
    return res.status(404).json(errors);
  }
  if (!validator.isLength(req.body.followerID, { min: 24, max: 24 })) {
    errors.lengthError = msg.lengthError;
    return res.status(404).json(errors);
  }
  if (!validator.matches(req.body.followerID, regex)) {
    errors.regexError = msg.regexError;
    return res.status(404).json(errors);
  }
  if (!req.user._id) {
    errors.userCurrentNotFound = msg.userCurrentNotFound;
    return res.status(404).json(errors);
  }

  //load models depending on User Role
  let Profile = selectModel(req.user.role);

  //find follows list of current user
  let userCurrent = getSet.getFollowers({
    model: Profile,
    userid: req.user._id
  });

  userCurrent.then(result => {
    //check list exists
    if (!result || typeof result === "undefined") {
      errors.listNotFound = msg.listNotFound;
      return res.status(404).json(errors);
    }

    //check if the userID is already present
    const followers = JSON.stringify(result.followers);
    if (!followers.includes(req.body.followerID)) {
      return res.status(200).json(msg.userIDAlready);
    }

    //new array with id removed
    const newList = arraySet.remove(result.followers, req.body.followerID);

    // //save new array to db
    dbSet.set({
      model: Profile,
      userid: req.user._id,
      objectName: dateGroup,
      data: newList,
      res: res,
      msg: msg.userIDRemoved
    });
  });

  userCurrent.catch(err => {
    return res.status(400).json(err);
  });
};

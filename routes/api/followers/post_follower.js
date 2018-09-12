//models
const UsersModel = require("../../../models/Users");

//functions
const selectModel = require("../../../functions/modelFunctions");
const profileFunctions = require("../../../functions/profileFunctions");
const userFunctions = require("../../../functions/userFunctions");
const dbFunctions = require("../../../functions/dbFunctions");

//validator
const validator = require("validator");

module.exports = get = (req, res) => {
  let errors = {};
  const getSet = new profileFunctions();
  const userSet = new userFunctions();
  const dbSet = new dbFunctions();
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  const dataGroup = "followers";
  const msg = {
    userNotFound: "The user could not be identified",
    userCurrentNotFound: "The current user could not be identified",
    listNotFound: "The current users followers list could not be found",
    userIDAlready: "User ID is already a follower",
    userIDAdded: "User ID has been added to the followers list",
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

  //check follower exists and return _id
  let user = userSet.getUserFromUserID({
    userid: req.body.followerID,
    model: UsersModel,
    data: "_id"
  });

  user.then(results => {
    // follower not found or not formatted
    if (!results || typeof results === "undefined" || !results._id) {
      errors.userNotFound = msg.userNotFound;
      return res.status(404).json(errors);
    }

    //get the current users follows list
    const usrID = JSON.stringify(results._id);

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

      //check if the followers ID is already present in the list
      const followers = JSON.stringify(result.followers);
      if (followers.includes(usrID)) {
        return res.status(200).json(msg.userIDAlready);
      }

      //push followers ID into users array
      result.followers.push(results._id);

      //save new array to db
      dbSet.set({
        model: Profile,
        userid: req.user._id,
        objectName: dataGroup,
        data: result.followers,
        res: res,
        msg: msg.userIDAdded
      });
    });

    userCurrent.catch(err => {
      return res.status(400).json(err);
    });
  });
};

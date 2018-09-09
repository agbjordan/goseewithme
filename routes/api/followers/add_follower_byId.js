const UsersModel = require("../../../models/Users");
const selectModel = require("../../../functions/selectModel");
const profileFunctions = require("../../../functions/profileFunctions");
const userFunctions = require("../../../functions/userFunctions");
const dbFunctions = require("../../../functions/dbFunctions");
const validator = require("validator");

module.exports = get = (req, res) => {
  let errors = {};
  const getSet = new profileFunctions();
  const userSet = new userFunctions();
  const dbSet = new dbFunctions();
  const userNotFound = "The user could not be identified";
  const userCurrentNotFound = "The current user could not be identified";
  const listNotFound = "The current users followers list could not be found";
  const userIDAlready = "User ID is already a follower";
  const userIDAdded = "User ID has been added to the followers list";
  const noUserID = "User ID not present";
  const typeError = "User ID is not a string";
  const lengthError = "User ID is not a valid length";
  const regexError = "User ID is not a valid format";
  const regex = new RegExp("^[a-zA-Z0-9]*$");

  //validate GET userID
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
  if (!req.user._id) {
    errors.userCurrentNotFound = userCurrentNotFound;
    return res.status(404).json(errors);
  }

  //check user exists and return _id
  let user = userSet.getUserFromUserID({
    userid: req.params.id,
    model: UsersModel,
    data: "_id"
  });

  user.then(results => {
    // User not found or not formatted
    if (!results || typeof results === "undefined") {
      errors.userNotFound = userNotFound;
      return res.status(404).json(errors);
    }

    if (!results._id) {
      errors.userNotFound = userNotFound;
      return res.status(404).json(errors);
    }

    //get the current users follows list
    const user = results;
    const usrID = JSON.stringify(user._id);

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
        errors.listNotFound = listNotFound;
        return res.status(404).json(errors);
      }

      //check if the userID is already present
      const followers = JSON.stringify(result.followers);
      if (followers.includes(usrID)) {
        return res.status(200).json(userIDAlready);
      }

      //push id into array
      result.followers.push(user._id);

      //save new array to db
      dbSet.set({
        model: Profile,
        userid: req.user._id,
        objectName: "followers",
        data: result.followers,
        res,
        msg: userIDAdded
      });
    });

    userCurrent.catch(err => {
      return res.status(400).json(msg);
    });
  });
};

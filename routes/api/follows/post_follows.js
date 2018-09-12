//model
const UsersModel = require("../../../models/Users");

//functions
const selectModel = require("../../../functions/modelFunctions");
const profileFunctions = require("../../../functions/profileFunctions");
const userFunctions = require("../../../functions/userFunctions");
const dbFunctions = require("../../../functions/dbFunctions");

//validation
const validator = require("validator");

module.exports = get = (req, res) => {
  let errors = {};
  const getSet = new profileFunctions();
  const userSet = new userFunctions();
  const dbSet = new dbFunctions();
  const dataGroup = "follows";
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  const msg = {
    userNotFound: "The user could not be identified",
    userCurrentNotFound: "The current user could not be identified",
    listNotFound: "The current users following list could not be found",
    userIDAlready: "User ID is already being followed",
    userIDAdded: "User ID has been added",
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
  if (!req.body.followsID) {
    errors.noUserID = msg.noUserID;
    return res.status(404).json(errors);
  }
  if (typeof req.body.followsID !== "string") {
    errors.typeError = msg.typeError;
    return res.status(404).json(errors);
  }
  if (!validator.isLength(req.body.followsID, { min: 24, max: 24 })) {
    errors.lengthError = msg.lengthError;
    return res.status(404).json(errors);
  }
  if (!validator.matches(req.body.followsID, regex)) {
    errors.regexError = msg.regexError;
    return res.status(404).json(errors);
  }

  //check user exists and return _id
  let user = userSet.getUserFromUserID({
    userid: req.body.followsID,
    model: UsersModel,
    data: "_id"
  });

  user.then(results => {
    // User not found or not formatted
    if (!results || !results._id || typeof results === "undefined") {
      errors.userNotFound = msg.userNotFound;
      return res.status(404).json(errors);
    }

    //get the current users follows list
    const usrID = results._id;

    //load models depending on User Role
    let Profile = selectModel(req.user.role);

    //find follows list of current user
    let userCurrent = getSet.getFollows({
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
      const following = result.follows;
      if (following.includes(usrID)) {
        return res.status(200).json(msg.userIDAlready);
      }

      //push id into array
      following.push(usrID);

      //save new array to db
      dbSet.set({
        model: Profile,
        userid: req.user._id,
        objectName: dataGroup,
        data: following,
        res: res,
        msg: msg.userIDAdded
      });
    });

    userCurrent.catch(err => {
      return res.status(400).json(err);
    });
  });

  user.catch(err => {
    return res.status(400).json(err);
  });
};

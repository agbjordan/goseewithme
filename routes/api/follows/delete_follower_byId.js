const selectModel = require("../../../functions/selectModel");
const profileFunctions = require("../../../functions/profileFunctions");
const dbFunctions = require("../../../functions/dbFunctions");
const validator = require("validator");

module.exports = get = (req, res) => {
  let errors = {};
  const getSet = new profileFunctions();
  const dbSet = new dbFunctions();
  const userCurrentNotFound = "The current user could not be identified";
  const listNotFound = "The current users following list could not be found";
  const userIDAlready = "This user is not being followed";
  const userIDRemoved = "This user has been unfollowed";
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
    const followers = JSON.stringify(result.follows);
    if (!followers.includes(req.params.id)) {
      //no
      return res.status(200).json(userIDAlready);
    }

    function remove(array, element) {
      const index = array.indexOf(element);
      if (index !== -1) {
        array.splice(index, 1);
      }
      return array;
    }

    //new array with id removed
    const newList = remove(result.follows, req.params.id);

    // //save new array to db
    dbSet.set({
      model: Profile,
      userid: req.user._id,
      objectName: "follows",
      data: newList,
      res,
      msg: userIDRemoved
    });
  });

  userCurrent.catch(err => {
    return res.status(400).json(msg);
  });
};

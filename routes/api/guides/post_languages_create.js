//load requires
const flatten = require("flat");
const moment = require("moment");
const selectModel = require("../../../functions/selectModel");
const propFunctions = require("../../../functions/propFunctions");
const dbFunctions = require("../../../functions/dbFunctions");
const validate = require("../../../validation/guides/languages");

module.exports = function post_GuidesLicense_create(req, res) {
  //defaults
  const dataGroup = "languages";
  const db = new dbFunctions();
  const prop = new propFunctions();
  const msg = "The current user profile could not be found";
  const userNotFound = "The current user could not be identified";
  const userNotGuide = "The current user is not a guide.";
  const userRole = "guide";
  const { errors, isValid } = validate(req.body);

  let profileFields = {
    user: req.user.id,
    languages: []
  };

  let props = ["language", "speaking", "reading", "writing"];

  //validate input data
  if (!isValid) {
    return res.status(400).json(errors);
  } else if (!req.user._id) {
    errors.userNotFound = userNotFound;
    return res.status(404).json(errors);
  } else if (!req.user.role || req.user.role !== userRole) {
    errors.userNotGuide = userNotGuide;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  Profile = selectModel(req.user.role);

  //languages array
  if (typeof req.body[dataGroup] !== "undefined") {
    profileFields[dataGroup] = JSON.parse(req.body[dataGroup]);
  }

  //run the switch to find the current profile
  db.create({
    model: Profile,
    userid: req.user._id,
    objectName: dataGroup,
    data: flatten(profileFields),
    res: res,
    msg: msg
  });
};
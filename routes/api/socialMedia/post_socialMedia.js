//dependencies
const flatten = require("flat");

//validator
const validate = require("../../../validation/profiles/socialMedia");

//functions
const selectModel = require("../../../functions/modelFunctions");
const propFunctions = require("../../../functions/propFunctions");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = function create(req, res) {
  //default const
  const { errors, isValid } = validate(req.body);
  const db = new dbFunctions();
  const prop = new propFunctions();
  const dataGroup = "socialMedia";
  const msg = "The current user profile could not be found";

  let profileFields = {
    user: req.user.id,
    socialMedia: {}
  };

  let props = [
    "facebook",
    "twitter",
    "youtube",
    "instagram",
    "line",
    "wechat",
    "linkedin",
    "whatsapp"
  ];

  //validate input data
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //load models depending on current User Role
  Profile = selectModel(req.user.role);

  //loop through all the body object properties
  prop.updateAllUndefinedProps({
    arr: props,
    objNew: profileFields[dataGroup],
    bodyObj: req.body
  });

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

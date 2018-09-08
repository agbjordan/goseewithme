const flatten = require("flat");
const validate = require("../../../validation/profiles/contactInfo");
const selectModel = require("../../../functions/selectModel");
const propFunctions = require("../../../functions/propFunctions");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = function create(req, res) {
  //default const
  const dataGroup = "contactInfo";
  const db = new dbFunctions();
  const prop = new propFunctions();
  const msg = "The Current User profile could not be found";
  const { errors, isValid } = validate(req.body);

  let profileFields = {
    user: req.user.id,
    contactInfo: {}
  };

  let props = [
    "telephone",
    "mobile",
    "email",
    "addressLine01",
    "addressLine02",
    "city",
    "country",
    "state",
    "zipcode"
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

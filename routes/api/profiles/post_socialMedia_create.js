// load dependencies
const flatten = require("flat");
const validateInput = require("../../../validation/profiles/socialMedia");

module.exports = function create(req, res) {
  //default const
  const { errors, isValid } = validateInput(req.body);
  const dataGroup = "socialMedia";
  const msg = "The current user profile could not be found";

  //Load Models
  let Profile = "";
  switch (req.user.role) {
    case "guide":
      Profile = require("../../../models/GuideProfiles");
      break;
    case "agent":
      Profile = require("../../../models/AgentProfiles");
      break;
    default:
      Profile = require("../../../models/TravellerProfiles");
  }

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

  const updateAllUndefinedProps = (arr, objNew, bodyObj) => {
    //updates all undefined props in second level objects
    //loop through all the body object properties
    for (var property in arr) {
      //check property exists in body object
      if (Object.prototype.hasOwnProperty.call(bodyObj, arr[property])) {
        //check if body property is undefined
        if (typeof bodyObj[arr[property]] !== "undefined") {
          objNew[arr[property]] = bodyObj[arr[property]];
        }
      }
    }
  };

  //validate input data
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //loop through all the body object properties
  updateAllUndefinedProps(props, profileFields.socialMedia, req.body);

  Profile.findOne({ user: req.user.id }, dataGroup)
    .then(profile => {
      if (profile) {
        //UPDATE PROFILE
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: flatten(profileFields) },
          {
            projection: dataGroup,
            new: true,
            upsert: true,
            returnNewDocument: true
          }
        )
          .then(profile => res.json(profile))
          .catch(err => console.log(err));
      } else {
        return res.status(404).json(msg);
      }
    })
    .catch(err => console.log(err));
};

const validateGuideContactInfo = require("../../../validation/guides/contactInfo");
const flatten = require("flat");
const moment = require("moment");

//load models
const GuideProfile = require("../../../models/GuideProfiles");

module.exports = function post_GuidesContactInfo_create(req, res) {
  //default const
  const profileFields = { user: req.user.id };
  //initiate errors and validation
  const { errors, isValid } = validateGuideContactInfo(req.body);

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

  //get feilds
  //contact info
  const contactInfoProps = [
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
  //create object
  profileFields.contactInfo = {};
  //loop through all the body object properties
  updateAllUndefinedProps(
    contactInfoProps,
    profileFields.contactInfo,
    req.body
  );

  GuideProfile.findOne({ user: req.user.id }, "contactInfo")
    .then(profile => {
      if (profile) {
        //UPDATE PROFILE
        GuideProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: flatten(profileFields) },
          {
            projection: "contactInfo",
            new: true,
            upsert: true,
            returnNewDocument: true
          }
        )
          .then(profile => res.json(profile))
          .catch(err => console.log(err));
      } else {
        let msg = "The Current User profile could not be found";
        return res.status(404).json(msg);
      }
    })
    .catch(err => console.log(err));
};

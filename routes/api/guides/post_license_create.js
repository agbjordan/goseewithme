const validateGuideLicense = require("../../../validation/guides/licenses");
const flatten = require("flat");
const moment = require("moment");

//load models
const GuideProfile = require("../../../models/GuideProfiles");

module.exports = function post_GuidesLicense_create(req, res) {
  //default const
  const profileFields = { user: req.user.id };
  //initiate errors and validation
  const { errors, isValid } = validateGuideLicense(req.body);

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
  //Licenses
  const licenseProps = ["licenseID", "licenseAuth", "licenseImg"];
  //create object
  profileFields.license = {};
  //loop through all the body object properties
  updateAllUndefinedProps(licenseProps, profileFields.license, req.body);
  //License Dates
  if (typeof req.body.licenseDate !== "undefined") {
    profileFields.license.licenseDate = moment(
      req.body.licenseDate,
      "DD/MM/YYYY"
    )
      .locale("en")
      .format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
  }
  if (typeof req.body.licenseExpiry !== "undefined") {
    profileFields.license.licenseExpiry = moment(
      req.body.licenseExpiry,
      "DD/MM/YYYY"
    )
      .locale("en")
      .format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
  }

  GuideProfile.findOne({ user: req.user.id }, "license")
    .then(profile => {
      if (profile) {
        //UPDATE PROFILE
        GuideProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: flatten(profileFields) },
          {
            projection: "license",
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

const validateGuideProfile = require("../../../validation/guides/profile");
const flatten = require("flat");
const moment = require("moment");

//load models
const GuideProfile = require("../../../models/GuideProfiles");

module.exports = function post_GuidesProfile_create(req, res) {
  //default const
  const profileFields = { user: req.user.id };
  //initiate errors and validation
  const { errors, isValid } = validateGuideProfile(req.body);

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
  //personal data
  const personalProps = [
    "handle",
    "profileImg",
    "bio",
    "age",
    "nationality",
    "gender"
  ];
  for (var property in personalProps) {
    if (typeof req.body[personalProps[property]] !== "undefined") {
      profileFields[personalProps[property]] =
        req.body[personalProps[property]];
    }
  }

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

  //Social Media
  const socialMediaProps = [
    "facebook",
    "twitter",
    "line",
    "wechat",
    "whatsapp",
    "linkedin",
    "instagram"
  ];
  //create object
  profileFields.socialMedia = {};
  // loop all props
  updateAllUndefinedProps(
    socialMediaProps,
    profileFields.socialMedia,
    req.body
  );

  //Newsletters
  const newsletterProps = [
    "productNews",
    "websiteNews",
    "agentNews",
    "guideNews",
    "competitionNews"
  ];
  //create object
  profileFields.newsletters = {};
  // loop all props
  updateAllUndefinedProps(newsletterProps, profileFields.newsletters, req.body);

  //products, follows, followers
  if (typeof req.body.products !== "undefined") {
    profileFields.products = req.body.products.split(",");
  }
  if (typeof req.body.follows !== "undefined") {
    profileFields.follows = req.body.follows.split(",");
  }
  if (typeof req.body.followers !== "undefined") {
    profileFields.followers = req.body.followers.split(",");
  }

  //languages array
  profileFields.languages = [];
  if (typeof req.body.languages !== "undefined") {
    profileFields.languages = JSON.parse(req.body.languages);
  }

  GuideProfile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        //UPDATE PROFILE
        GuideProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: flatten(profileFields) },
          { new: true, upsert: true, returnNewDocument: true }
        )
          .then(profile => res.json(profile))
          .catch(err => console.log(err));
      } else {
        //CREATE PROFILE
        //Check if handle already exists
        GuideProfile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "This handle already exists";
              res.status(400).json(errors);
            }

            //Save Profile
            new GuideProfile(flatten(profileFields))
              .save()
              .then(profile => res.json(profile))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

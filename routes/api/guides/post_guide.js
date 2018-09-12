//dependencies
const flatten = require("flat");
const moment = require("moment");

//models
const GuideProfile = require("../../../models/GuideProfiles");

//functions
const propFunctions = require("../../../functions/propFunctions");
const dbFunctions = require("../../../functions/dbFunctions");
const userFunctions = require("../../../functions/userFunctions");

//validator
const validate = require("../../../validation/guides/profile");

module.exports = function post_Profile_create(req, res) {
  const db = new dbFunctions();
  const propFun = new propFunctions();
  const userFun = new userFunctions();
  const { errors, isValid } = validate(req.body);
  const profileFields = {
    user: req.user.id,
    license: {},
    contactInfo: {},
    socialMedia: {},
    newsletters: {},
    languages: [],
    products: [],
    follows: [],
    followers: []
  };
  const personalProps = [
    "handle",
    "profileImg",
    "bio",
    "age",
    "nationality",
    "gender"
  ];
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
  const socialMediaProps = [
    "facebook",
    "twitter",
    "line",
    "wechat",
    "whatsapp",
    "linkedin",
    "instagram"
  ];
  const newsletterProps = [
    "productNews",
    "websiteNews",
    "agentNews",
    "guideNews",
    "competitionNews"
  ];
  const licenseProps = ["licenseID", "licenseAuth", "licenseImg"];

  //validate input data
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //loop through all the body object properties
  for (var property in personalProps) {
    if (typeof req.body[personalProps[property]] !== "undefined") {
      profileFields[personalProps[property]] =
        req.body[personalProps[property]];
    }
  }
  propFun.updateAllUndefinedProps({
    arr: licenseProps,
    objNew: profileFields.license,
    bodyObj: req.body
  });
  propFun.updateAllUndefinedProps({
    arr: contactInfoProps,
    objNew: profileFields.contactInfo,
    bodyObj: req.body
  });
  propFun.updateAllUndefinedProps({
    arr: socialMediaProps,
    objNew: profileFields.socialMedia,
    bodyObj: req.body
  });
  propFun.updateAllUndefinedProps({
    arr: newsletterProps,
    objNew: profileFields.newsletters,
    bodyObj: req.body
  });

  //license dates
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
  if (typeof req.body.languages !== "undefined") {
    profileFields.languages = JSON.parse(req.body.languages);
  }

  userFun
    .getByUserID({
      user: req.user.id,
      model: GuideProfile
    })
    .then(profile => {
      if (profile) {
        //UPDATE PROFILE
        db.create({
          model: GuideProfile,
          userid: req.user._id,
          data: flatten(profileFields),
          res: res
        });
      } else {
        //CREATE PROFILE
        //Check if handle already exists
        const handleExists = userFun.doesHandleExist({
          handle: profileFields.handle,
          model: GuideProfile
        });
        if (handleExists === false) {
          errors.handle = "This handle already exists";
          res.status(400).json(errors);
        } else {
          //Save Profile
          new GuideProfile(flatten(profileFields))
            .save()
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        }
      }
    })
    .catch(err => console.log(err));
};

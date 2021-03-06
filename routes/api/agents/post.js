//dependencies
const flatten = require("flat");
const moment = require("moment");

//models
const ProfileAgents = require("../../../models/AgentProfiles");
const ProfileGuides = require("../../../models/GuideProfiles");

//functions
const propFunctions = require("../../../functions/propFunctions");
const userFunctions = require("../../../functions/userFunctions");

//validator
const validate = require("../../../validation/agents/profile");

module.exports = function create(req, res) {
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
    "companyName",
    "website"
  ];
  const contactInfoProps = [
    "telephone",
    "hotline",
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
  const accredProps = ["AccredID", "AccredAuth", "AccredImg"];

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
    arr: accredProps,
    objNew: profileFields.accreditations,
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

  //accred dates
  if (typeof req.body.accredDate !== "undefined") {
    profileFields.accreditations.accredDate = moment(
      req.body.accredDate,
      "DD/MM/YYYY"
    )
      .locale("en")
      .format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
  }

  if (typeof req.body.accredExpiry !== "undefined") {
    profileFields.accreditations.accredExpiry = moment(
      req.body.accredExpiry,
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
  if (typeof req.body.guidesIDs !== "undefined") {
    profileFields.guidesIDs = req.body.guidesIDs.split(",");
  }
  if (typeof req.body.operateIn !== "undefined") {
    profileFields.operateIn = req.body.operateIn.split(",");
  }
  if (typeof req.body.subUsers !== "undefined") {
    profileFields.subUsers = req.body.subUsers.split(",");
  }

  let profileUser = userFun.getByUserID({
    userid: req.user._id,
    model: ProfileAgents,
    data: "user"
  });

  profileUser.then(profile => {
    if (profile) {
      //UPDATE PROFILE
      let updateProfile = ProfileAgents.findOneAndUpdate(
        { user: req.user._id },
        { $set: flatten(profileFields) },
        {
          new: true,
          upsert: true,
          returnNewDocument: true
        }
      ).exec();
      updateProfile.then(profile => {
        return res.status(200).json(profile);
      });
      updateProfile.catch(err => console.log(err));
    } else {
      //CREATE PROFILE
      //Check if handle already exists in Agents
      let profileAgent = userFun.doesHandleExist({
        handle: profileFields.handle,
        model: ProfileAgents
      });

      profileAgent.then(result => {
        if (result) {
          errors.handle = "This handle already exists";
          res.status(400).json(errors);
        } else {
          //Check if handle already exists in guides
          let profileGuides = userFun.doesHandleExist({
            handle: profileFields.handle,
            model: ProfileGuides
          });

          profileGuides.then(result => {
            if (result) {
              errors.handle = "This handle already exists";
              res.status(400).json(errors);
            } else {
              //Save Profile
              new ProfileAgents(flatten(profileFields))
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.log(err));
            }
          });
          profileGuides.catch(err => console.log(err));
        }
      });
      profileAgent.catch(err => console.log(err));
    }
  });
  profileUser.catch(err => console.log(err));
};

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// require models
const User = require("../../models/Users");
const TravellerProfile = require("../../models/TravellerProfiles");
const GuideProfile = require("../../models/GuideProfiles");
const AgentProfile = require("../../models/AgentProfiles");

// router
const router = express.Router();

//PROFILES ROUTES
//Get Routes
//Route     GET /api/profiles/current
//Route     GET /api/profiles/test

//Post Routes
//Route     GET /api/profiles/create-agent
//Route     GET /api/profiles/create-guide
//Route     GET /api/profiles/create-traveller

//////////////////////////
////////// GET ///////////
//////////////////////////

//Route     GET /api/profiles/test
//Desc      Return the current user profile (Traveller, Guide or Agent)
//Access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};

    // User role could not be found
    if (!req.user.role) {
      errors.roleNotFound = "The current users role could not be identified";
      return res.status(404).json(errors);
    }

    //use switch to get correct profile
    const getProfileByRole = role => {
      switch (role) {
        case "guide": //guide
          GuideProfile.findOne({ user: req.user._id })
            .then(profile => {
              return profile;
            })
            .catch(err => console.log(err));
          break;
        case "agent": //agent
          AgentProfile.findOne({ user: req.user._id })
            .then(profile => {
              return profile;
            })
            .catch(err => console.log(err));
          break;
        default:
          //traveller
          TravellerProfile.findOne({ user: req.user._id })
            .then(profile => {
              return profile;
            })
            .catch(err => console.log(err));
          break;
      }
    };

    //run the switch to find the current profile
    const userProfile = getProfileByRole(req.user.role);
    //no profiles found
    if (!userProfile) {
      errors.userProfileNotFound = "Could not find current user profile";
      return res.status(404).json(errors);
    }

    //profile found
    res.json(userProfile);
  }
);

//Route     GET /api/profiles/test
//Desc      Test Profiles Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Profiles Works" }));

//////////////////////////
////////// POST //////////
//////////////////////////

//Route     POST /api/profiles/create-guide
//Desc      Create a Guide profile
//Access    Private
router.post(
  "/create-guide",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //default const
    const profileFields = {
      user: req.user.id
    };

    // get feilds
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.profileImg) profileFields.profileImg = req.body.profileImg;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.nationality) profileFields.nationality = req.body.nationality;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.licenseID)
      profileFields.license.licenseID = req.body.licenseID;
    if (req.body.licenseAuth)
      profileFields.license.licenseAuth = req.body.licenseAuth;
    if (req.body.licenseDate)
      profileFields.license.licenseDate = req.body.licenseDate;
    if (req.body.licenseExpiry)
      profileFields.license.licenseExpiry = req.body.licenselicenseExpiry;
    if (req.body.licenseImg)
      profileFields.license.licenseImg = req.body.licenseImg;
    if (req.body.telephone)
      profileFields.contactInfo.telephone = req.body.telephone;
    if (req.body.mobile) profileFields.contactInfo.mobile = req.body.mobile;
    if (req.body.email) profileFields.contactInfo.email = req.body.email;
    if (req.body.addressLine01)
      profileFields.contactInfo.addressLine01 = req.body.addressLine01;
    if (req.body.addressLine02)
      profileFields.contactInfo.addressLine02 = req.body.addressLine02;
    if (req.body.city) profileFields.contactInfo.city = req.body.city;
    if (req.body.state) profileFields.contactInfo.state = req.body.state;
    if (req.body.country) profileFields.contactInfo.country = req.body.country;
    if (req.body.zipcode) profileFields.contactInfo.zipcode = req.body.zipcode;
    if (req.body.facebook)
      profileFields.socialMedia.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.socialMedia.twitter = req.body.twitter;
    if (req.body.line) profileFields.socialMedia.line = req.body.line;
    if (req.body.wechat) profileFields.socialMedia.wechat = req.body.wechat;
    if (req.body.whatsapp)
      profileFields.socialMedia.whatsapp = req.body.whatsapp;
    if (req.body.linkedin)
      profileFields.socialMedia.linkedin = req.body.linkedin;
    if (req.body.newsletter_products)
      profileFields.newsletters.products = req.body.newsletter_products;
    if (req.body.newsletter_guideNews)
      profileFields.newsletters.guideNews = req.body.newsletter_guideNews;
    if (req.body.newsletter_agentNews)
      profileFields.newsletters.agentNews = req.body.newsletter_agentNews;
    if (req.body.newsletter_website)
      profileFields.newsletters.website = req.body.newsletter_website;
    if (req.body.newsletter_competitions)
      profileFields.newsletters.competitions = req.body.newsletter_competitions;
    if (req.body.languages) {
      req.body.languages.map(lang, i, () => {
        const lan = {};
        if (req.body.language[i]) lan.language = req.body.language[i];
        if (req.body.speaking[i]) lan.speaking = req.body.speaking[i];
        if (req.body.reading[i]) lan.reading = req.body.reading[i];
        if (req.body.writing[i]) lan.writing = req.body.writing[i];
        profileFields.languages.push(lan);
      });
    }
  }
);

//export
module.exports = router;

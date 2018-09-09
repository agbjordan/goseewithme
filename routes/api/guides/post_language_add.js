//load requires
const flatten = require("flat");
const moment = require("moment");
const selectModel = require("../../../functions/selectModel");
const propFunctions = require("../../../functions/propFunctions");
const dbFunctions = require("../../../functions/dbFunctions");
const validate = require("../../../validation/guides/languages");

module.exports = function post(req, res) {
  //defaults
  const dataGroup = "languages";
  const db = new dbFunctions();
  const prop = new propFunctions();
  const msg = "The current user profile could not be found";
  const userNotFound = "The current user could not be identified";
  const userNotGuide = "The current user is not a guide.";
  const userRole = "guide";
  const { errors, isValid } = validate(req.body);
  let rtn = "done";

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

  //get the current languages objects
  //create a new array of these objects
  //loop the posted array
  //if the 2 languages match = update the new arrays data
  //after loops through all posted objs
  //if the posted language is not in the new array, push it
  //findOneAndUpdate new array to current languages

  //loop array
  Profile.findOne({ user: req.user._id }, "languages")
    .then(currentUser => {
      const currentLanguagesLen = currentUser.languages.length;
      const postedLanguagesLen = profileFields[dataGroup].length;
      const newLangArray = currentUser.languages;

      //loop existing languages
      if (currentLanguagesLen > 0) {
        for (var n = 0; n < postedLanguagesLen; n++) {
          let postedLanguage = profileFields[dataGroup][n].language;
          let count = 1;
          for (var i = 0; i < currentLanguagesLen; i++) {
            count++;
            let currentLanguage = currentUser.languages[i].language;
            if (currentLanguage === postedLanguage) {
              //update current language details
              newLangArray[i] = profileFields[dataGroup][n];
              break;
            }
            if (count > currentLanguagesLen) {
              //add new language details
              console.log(count + ": " + profileFields[dataGroup][n]);
              newLangArray.push(profileFields[dataGroup][n]);
            }
          }
        }
        //update
        Profile.findOneAndUpdate(
          { user: req.user._id },
          {
            $set: {
              languages: newLangArray
            }
          },
          {
            projection: "languages",
            new: true,
            upsert: true,
            returnNewDocument: true
          }
        )
          .then(newLangs => {
            return res.status(404).json(newLangs);
          })
          .catch(err => console.log(err));
      } else {
        //no current langauges exist
        //add new language array
        Profile.findOneAndUpdate(
          { user: req.user._id },
          {
            $set: {
              languages: profileFields[dataGroup]
            }
          },
          {
            projection: "languages",
            new: true,
            upsert: true,
            returnNewDocument: true
          }
        )
          .then(newLangs => {
            return res.status(404).json(newLangs);
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

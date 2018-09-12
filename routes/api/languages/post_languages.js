//functions
const selectModel = require("../../../functions/modelFunctions");

//validator
const validate = require("../../../validation/guides/languages");

module.exports = function post(req, res) {
  const { errors, isValid } = validate(req.body);
  const dataGroup = "languages";
  const userRole = "guide";
  const msg = {
    profileNotFound: "The current user profile could not be found",
    userNotFound: "The current user could not be identified",
    userNotGuide: "The current user is not a guide."
  };
  let profileFields = {
    user: req.user.id,
    languages: []
  };

  //validate input data
  if (!isValid) {
    return res.status(400).json(errors);
  } else if (!req.user._id) {
    errors.profileNotFound = msg.profileNotFound;
    return res.status(404).json(errors);
  } else if (!req.user.role || req.user.role !== userRole) {
    errors.userNotGuide = msg.userNotGuide;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  Profile = selectModel(req.user.role);

  //languages array
  if (typeof req.body[dataGroup] !== "undefined") {
    profileFields[dataGroup] = JSON.parse(req.body[dataGroup]);
  }

  //loop array
  Profile.findOne({ user: req.user._id }, dataGroup)
    .then(currentUser => {
      const currentLen = currentUser[dataGroup].length;
      const postedLen = profileFields[dataGroup].length;
      const newArray = currentUser[dataGroup];

      //Is the current langauges list > 0
      if (currentLen > 0) {
        //loop posted languages
        for (var n = 0; n < postedLen; n++) {
          let postedLanguage = profileFields[dataGroup][n].language;
          let count = 1;
          //loop current langauges
          for (var i = 0; i < currentLen; i++) {
            count++;
            let currentLanguage = currentUser[dataGroup][i].language;
            //do the current and posted lanagues match?
            if (currentLanguage === postedLanguage) {
              //add the posted langauge to the new array
              //update current language details
              newArray[i] = profileFields[dataGroup][n];
              break;
            }
            //if we've reached the end of the current list
            //and the posted language is not listed
            //add the posted langauges to the new array
            if (count > currentLen) {
              newArray.push(profileFields[dataGroup][n]);
            }
          }
        }

        //update
        Profile.findOneAndUpdate(
          { user: req.user._id },
          {
            $set: {
              languages: newArray
            }
          },
          {
            projection: dataGroup,
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
            projection: dataGroup,
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

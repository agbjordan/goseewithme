const validator = require("validator");
const is_Empty = require("../is_Empty");
const moment = require("moment");
const flatten = require("flat");

module.exports = function validate(data) {
  let errors = {};
  const data_flat = flatten(data);

  //convert all null, undefined, empty objects to empty strings
  function emptyOrString(property) {
    return !is_Empty(property) ? property : "";
  }

  //loop through all the object properties
  for (var property in data_flat) {
    if (Object.prototype.hasOwnProperty.call(data, property)) {
      data[property] = emptyOrString(data[property]);
    }
  }

  //check that some data was sent from the form
  if (Object.keys(data).length === 0) {
    errors["nodata"] = "No form data was submitted";
  } else {
    //languages - at least 1 is required
    if (data.languages) {
      const languages = JSON.parse(data.languages);
      const arrayLength = languages.length;
      if (!is_Empty(languages)) {
        for (var i = 0; i < arrayLength; i++) {
          if (!languages[i].language) {
            errors.language = "Language is required";
          }
          if (!languages[i].speaking) {
            errors.speaking = "Speaking is required";
          }
          if (!languages[i].reading) {
            errors.reading = "Reading is required";
          }
          if (!languages[i].writing) {
            errors.writing = "Writing is required";
          }
        }
      }
    }
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

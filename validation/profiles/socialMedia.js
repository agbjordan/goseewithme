const validator = require("validator");
const is_Empty = require("../is_Empty");
const moment = require("moment");
const flatten = require("flat");

module.exports = function validateInput(data) {
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

  //social Media
  const socialMedia = [
    "facebook",
    "twitter",
    "youtube",
    "instagram",
    "line",
    "wechat",
    "linkedin",
    "whatsapp"
  ];

  if (Object.keys(data).length === 0) {
    errors["nodata"] = "No form data was submitted";
  } else {
    socialMedia.map((social, i, socialMedia) => {
      if (!is_Empty(data[social])) {
        if (!validator.isURL(data[social])) {
          errors[social] = "Enter a valid URL";
        }
      }
    });
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

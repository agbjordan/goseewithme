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

  //newsletters
  const newsletters = [
    "productNews",
    "websiteNews",
    "guideNews",
    "agentNews",
    "competitionNews"
  ];

  if (Object.keys(data).length === 0) {
    errors["nodata"] = "No form data was submitted";
  } else {
    newsletters.map((news, i, newsletters) => {
      if (!is_Empty(data[news])) {
        if (!validator.isBoolean(data[news])) {
          errors[news] = "Value not valid: True or False Only";
        }
      }
    });
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

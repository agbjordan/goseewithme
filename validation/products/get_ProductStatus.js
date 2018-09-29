const validator = require("validator");
const is_Empty = require("../is_Empty");
const flatten = require("flat");

module.exports = function validate(data) {
  let errors = {};
  const data_flat = flatten(data);
  const accepted = ["Live", "Draft", "Published", "Review", "Suspended"];

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

  //Error handling
  //Status
  if (data.status) {
    if (validator.isEmpty(data.status)) {
      errors.status =
        "Status is required, must be either name, date, status, country, city, or price.";
    }
    if (!validator.isIn(data.status, accepted)) {
      errors.status =
        "Status is not valid, must be either name, date, status, country, city, or price.";
    }
  } else {
    errors.status =
      "Status is required, must be either name, date, status, country, city, or price.";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

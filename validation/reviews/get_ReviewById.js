const validator = require("validator");
const is_Empty = require("../is_Empty");
const flatten = require("flat");

module.exports = function validate(data) {
  let errors = {};
  const data_flat = flatten(data);
  const regex = new RegExp("^[a-zA-Z0-9]*$");

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
  //REview ID
  if (data.reviewID) {
    if (!validator.isLength(data.reviewID, { min: 24, max: 24 })) {
      errors.reviewID = "ID is invalid length";
    }
    if (!validator.matches(data.reviewID, regex)) {
      errors.reviewID = "ID is invalid string";
    }
    if (validator.isEmpty(data.reviewID)) {
      errors.reviewID = "ID is required";
    }
  } else {
    errors.reviewID = "ID is required";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

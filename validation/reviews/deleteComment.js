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
  //Review ID
  if (data.id) {
    if (!validator.isLength(data.id, { min: 24, max: 24 })) {
      errors.id = "Review ID is invalid length";
    }
    if (!validator.matches(data.id, regex)) {
      errors.id = "Review ID is invalid string";
    }
    if (validator.isEmpty(data.id)) {
      errors.id = "Review ID is required";
    }
  } else {
    errors.id = "Review ID is required";
  }

  //Comment ID
  if (data.cid) {
    if (!validator.isLength(data.cid, { min: 24, max: 24 })) {
      errors.cid = "Comment ID is invalid length";
    }
    if (!validator.matches(data.cid, regex)) {
      errors.cid = "Comment ID is invalid string";
    }
    if (validator.isEmpty(data.cid)) {
      errors.cid = "Comment ID is required";
    }
  } else {
    errors.cid = "Comment ID is required";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

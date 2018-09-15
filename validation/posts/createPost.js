const validator = require("validator");
const is_Empty = require("../is_Empty");
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

  //Error handling
  //Post Text
  if (data.text) {
    if (!validator.isLength(data.text, { min: 2, max: 300 })) {
      errors.text = "Post must be between 2 and 300 characters";
    }

    if (validator.isEmpty(data.text)) {
      errors.text = "Post text is required";
    }
  } else {
    errors.text = "Post text is required";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

const validator = require("validator");
const is_Empty = require("../is_Empty");
const flatten = require("flat");

module.exports = function validate(data) {
  let errors = {};
  const data_flat = flatten(data);
  const accepted = ["name", "date", "status", "country", "city", "price"];

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
  //Sort
  if (data.sort) {
    if (validator.isEmpty(data.sort)) {
      errors.sort =
        "Sort is required, must be either name, date, status, country, city, or price.";
    }
    if (!validator.isIn(data.sort, accepted)) {
      errors.sort =
        "Sort is not valid, must be either name, date, status, country, city, or price.";
    }
  } else {
    errors.sort =
      "Sort is required, must be either name, date, status, country, city, or price.";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

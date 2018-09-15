const validator = require("validator");
const is_Empty = require("../is_Empty");
const flatten = require("flat");

module.exports = class validateComment {
  validateParams(data) {
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
    //Post ID
    if (data.id) {
      if (!validator.isLength(data.id, { min: 24, max: 24 })) {
        errors.id = "ID must be between 24 characters";
      }

      if (!validator.matches(data.id, regex)) {
        errors.id = "ID is not valid";
      }

      if (validator.isEmpty(data.id)) {
        errors.id = "ID is required";
      }
    } else {
      errors.id = "ID is required";
    }

    return {
      errorsParams: errors,
      isValidParams: is_Empty(errors)
    };
  }

  validateBody(data) {
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

    //Comment Text
    if (data.text) {
      if (!validator.isLength(data.text, { min: 2, max: 300 })) {
        errors.text = "Comment must be between 2 and 300 characters";
      }

      if (validator.isEmpty(data.text)) {
        errors.text = "Comment text is required";
      }
    } else {
      errors.text = "Comment text is required";
    }

    return {
      errorsBody: errors,
      isValidBody: is_Empty(errors)
    };
  }
};

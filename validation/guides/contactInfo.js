const validator = require("validator");
const is_Empty = require("../is_Empty");
const flatten = require("flat");

module.exports = function validateGuideContactInfo(data) {
  let errors = {};
  const telephoneCheck = new RegExp("^[ -+#0-9]{8,20}$");
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
  //email validation
  if (data.email) {
    if (!validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    if (validator.isEmpty(data.email)) {
      errors.email = "Email is required";
    }
  } else {
    errors.email = "Email is required";
  }

  //nationality validation
  if (data.nationality) {
    if (validator.isEmpty(data.nationality)) {
      errors.nationality = "Nationality is required";
    }
  } else {
    errors.nationality = "Nationality is required";
  }

  //city validation
  if (data.city) {
    if (validator.isEmpty(data.city)) {
      errors.city = "City is required";
    }
  } else {
    errors.city = "City is required";
  }

  //country validation
  if (data.country) {
    if (validator.isEmpty(data.country)) {
      errors.country = "Country is required";
    }
  } else {
    errors.country = "Country is required";
  }

  //telephone validation
  if (data.telephone) {
    if (!validator.matches(data.telephone, telephoneCheck)) {
      errors.telephone = "Invalid Telephone Number";
    }
    if (!validator.isLength(data.telephone, { min: 8, max: 20 })) {
      errors.telephone = "Your Telephone must be between 2 and 40 characters";
    }
    if (validator.isEmpty(data.telephone)) {
      errors.telephone = "Telephone is required";
    }
  } else {
    errors.telephone = "Telephone is required";
  }

  //mobile validation - optional
  if (!is_Empty(data.mobile)) {
    if (!validator.matches(data.mobile, telephoneCheck)) {
      errors.mobile = "Invalid Mobile Number";
    }
    if (!validator.isLength(data.mobile, { min: 8, max: 20 })) {
      errors.mobile = "Your Mobile must be between 2 and 40 characters";
    }
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

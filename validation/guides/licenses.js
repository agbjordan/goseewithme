const validator = require("validator");
const is_Empty = require("../is_Empty");
const moment = require("moment");
const flatten = require("flat");

module.exports = function validate(data) {
  let errors = {};
  const today = moment().format();
  const todayAsString = today.toString();
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
    //licenses - optional
    //license Date
    if (!is_Empty(data.licenseDate)) {
      const licDate = moment(data.licenseDate, "DD/MM/YYYY");
      const licDateToString = licDate.toString();
      if (validator.isAfter(licDateToString, todayAsString)) {
        errors.licenseDate = "This date is not valid";
      }
      if (licDate.isValid() === false) {
        errors.licenseDate = `Not a valid date: ${licDate}`;
      }
    }

    //license Expiry
    if (!is_Empty(data.licenseExpiry)) {
      const licExpiry = moment(data.licenseExpiry, "DD/MM/YYYY");
      const licExpiryToString = licExpiry.toString();
      if (validator.isAfter(licExpiryToString, todayAsString)) {
        errors.licenseExpiry = "This expiry date is not valid";
      }
      if (licExpiry.isValid() === false) {
        errors.licenseExpiry = `Not a valid date: ${licExpiry}`;
      }
    }

    //license Authority
    if (!is_Empty(data.licenseAuth)) {
      if (validator.isEmpty(data.licenseAuth)) {
        errors.licenseAuth = "Enter the guide license authority/agency";
      }
    }

    //license ID
    if (!is_Empty(data.licenseID)) {
      if (validator.isEmpty(data.licenseID)) {
        errors.licenseID = "Enter the guide license ID";
      }
    }

    //license validated
    //license ID
    if (data.validated) {
      if (!validator.isBoolean(data.validated)) {
        errors.validated = "Validation must be true or false";
      }
    }
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

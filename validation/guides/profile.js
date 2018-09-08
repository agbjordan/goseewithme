const validator = require("validator");
const is_Empty = require("../is_Empty");
const moment = require("moment");
const flatten = require("flat");

module.exports = function validate(data) {
  let errors = {};
  const handleCheck = new RegExp("^[a-zA-Z0-9]{2,40}$");
  const telephoneCheck = new RegExp("^[ -+#0-9]{8,20}$");
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

  //Error handling
  //handle validation
  if (data.handle) {
    if (!validator.matches(data.handle, handleCheck)) {
      errors.handle =
        "Your handle can only contain letters and numbers, with no spaces";
    }
    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
      errors.handle = "Your handle must be between 2 and 40 characters";
    }
    if (validator.isEmpty(data.handle)) {
      errors.handle = "Handle is required";
    }
  } else {
    errors.handle = "Handle is required";
  }

  //bio validation - optional
  if (!is_Empty(data.bio)) {
    if (!validator.isLength(data.bio, { min: 0, max: 500 })) {
      errors.bio = "Bio has a maximum of 500 characters";
    }
  }

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

  //age validation - optional
  if (!is_Empty(data.age)) {
    if (!validator.isInt(data.age, { min: 16, max: 110 })) {
      errors.age = "Enter your age (Above 16 years old)";
    }
  }

  //languages - at least 1 is required
  if (data.languages) {
    const languages = JSON.parse(data.languages);
    const arrayLength = languages.length;
    if (!is_Empty(languages)) {
      for (var i = 0; i < arrayLength; i++) {
        if (!languages[i].language) {
          errors.language = "Language is required";
        }
        if (!languages[i].speaking) {
          errors.speaking = "Speaking is required";
        }
        if (!languages[i].reading) {
          errors.reading = "Reading is required";
        }
        if (!languages[i].writing) {
          errors.writing = "Writing is required";
        }
      }
    }
  }

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

  socialMedia.map((social, i, socialMedia) => {
    if (!is_Empty(data[social])) {
      if (!validator.isURL(data[social])) {
        errors[social] = "Enter a valid URL";
      }
    }
  });

  //newsletters
  const newsletters = [
    "productNews",
    "websiteNews",
    "guideNews",
    "agentNews",
    "competitionNews"
  ];

  newsletters.map((news, i, newsletters) => {
    if (!is_Empty(data[news])) {
      if (!validator.isBoolean(data[news])) {
        errors[news] = "Value not valid: True or False Only";
      }
    }
  });

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

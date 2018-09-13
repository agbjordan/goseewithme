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

  //website validation
  if (data.website) {
    if (!validator.isURL(data.website)) {
      errors.website = "Website is invalid";
    }
    if (validator.isEmpty(data.website)) {
      errors.website = "Website is required";
    }
  } else {
    errors.website = "Website is required";
  }

  //companyName validation
  if (data.companyName) {
    if (validator.isEmpty(data.companyName)) {
      errors.companyName = "Company name is required";
    }
  } else {
    errors.companyName = "company name is required";
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

  //hotline validation - optional
  if (!is_Empty(data.hotline)) {
    if (!validator.matches(data.hotline, telephoneCheck)) {
      errors.hotline = "Invalid Hotline Number";
    }
    if (!validator.isLength(data.hotline, { min: 8, max: 20 })) {
      errors.hotline = "Your Hotline must be between 2 and 40 characters";
    }
  }

  //Accreditations - optional
  //Accreditations Date
  if (!is_Empty(data.accredDate)) {
    const AccDate = moment(data.accredDate, "DD/MM/YYYY");
    const AccDateToString = AccDate.toString();
    if (validator.isAfter(AccDateToString, todayAsString)) {
      errors.accredDate = "This date is not valid";
    }
    if (AccDate.isValid() === false) {
      errors.accredDate = `Not a valid date: ${AccDate}`;
    }
  }

  //Accreditations Expiry
  if (!is_Empty(data.accredExpiry)) {
    const accExpiry = moment(data.accredExpiry, "DD/MM/YYYY");
    const accExpiryToString = accExpiry.toString();
    if (validator.isAfter(accExpiryToString, todayAsString)) {
      errors.accredExpiry = "This expiry date is not valid";
    }
    if (accExpiry.isValid() === false) {
      errors.accredExpiry = `Not a valid date: ${accExpiry}`;
    }
  }

  //Accreditations Authority
  if (!is_Empty(data.accredAuth)) {
    if (validator.isEmpty(data.accredAuth)) {
      errors.accredAuth = "Enter the accrediation authority/agency";
    }
  }

  //Accreditations ID
  if (!is_Empty(data.accredID)) {
    if (validator.isEmpty(data.accredID)) {
      errors.accredID = "Enter the Accreditation ID";
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

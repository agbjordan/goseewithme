const validator = require("validator");
const is_Empty = require("../is_Empty");

module.exports = function validate(data) {
  let errors = {};
  const secret = "nochange";
  const passwordCheck = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  //turn empty values into strings
  data._id = !is_Empty(data._id) ? data._id : "";
  data.firstname = !is_Empty(data.firstname) ? data.firstname : "";
  data.surname = !is_Empty(data.surname) ? data.surname : "";
  data.email = !is_Empty(data.email) ? data.email : "";
  data.password = !is_Empty(data.password) ? data.password : "";
  data.confirm = !is_Empty(data.confirm) ? data.confirm : "";
  data.userRole = !is_Empty(data.userRole) ? data.userRole : "";

  //id validation

  if (!validator.isLength(data._id, { min: 24, max: 24 })) {
    errors._id = "Administrator ID must be 24 characters";
  }

  if (validator.isEmpty(data._id)) {
    errors._id = "Administrator ID is missing";
  }

  //firstname validation
  if (!validator.isLength(data.firstname, { min: 2, max: 50 })) {
    errors.firstname = "First Name must be between 2 and 50 characters";
  }

  if (validator.isEmpty(data.firstname)) {
    errors.firstname = "First Name is required";
  }

  //surname validation
  if (!validator.isLength(data.surname, { min: 2, max: 50 })) {
    errors.surname = "Surname must be between 2 and 50 characters";
  }

  if (validator.isEmpty(data.surname)) {
    errors.surname = "Surname is required";
  }

  //email validation
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  //password validation
  if (data.password !== secret) {
    if (!validator.matches(data.password, passwordCheck)) {
      errors.password =
        "Password must contain a least 8 letters, including 1 uppercase and 1 special character";
    }

    if (!validator.isLength(data.password, { min: 8 })) {
      errors.password =
        "Password must contain a least 8 letters, including 1 uppercase and 1 special character";
    }

    if (validator.isEmpty(data.password)) {
      errors.password = "Password is required";
    }
  }

  //password_confirm validation
  if (!validator.equals(data.password, data.confirm)) {
    errors.confirm = "Passwords do not match";
  }

  if (validator.isEmpty(data.confirm)) {
    errors.confirm = "Password Confirm is required";
  }

  //Admin Role validation
  if (validator.isEmpty(data.userRole)) {
    errors.userRole = "Administration Role is required";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

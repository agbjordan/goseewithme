const validator = require("validator");
const is_Empty = require("./is_Empty");

module.exports = function validatePwReset(data) {
  console.log(data);
  let errors = {};
  const passwordCheck = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  //turn empty values into strings
  data.email = !is_Empty(data.email) ? data.email : "";
  data.password = !is_Empty(data.password) ? data.password : "";
  data.password_confirm = !is_Empty(data.password_confirm)
    ? data.password_confirm
    : "";

  //email validation
  if (!validator.isEmail(data.email)) {
    errors.email = "Username is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Username is required";
  }

  //password validation

  if (!validator.matches(data.password, passwordCheck)) {
    errors.password =
      "1. Password must contain a least 8 letters, include 1 lowercase, 1 uppercase and 1 special character";
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password =
      "2. Password must contain a least 8 letters, include 1 lowercase, 1 uppercase and 1 special character";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  //password_confirm validation
  if (!validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "Passwords do not match";
  }

  if (validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = "Password Confirm is required";
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

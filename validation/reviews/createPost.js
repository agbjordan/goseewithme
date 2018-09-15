const validator = require("validator");
const is_Empty = require("../is_Empty");
const flatten = require("flat");

module.exports = function validate(data) {
  let errors = {};
  const data_flat = flatten(data);
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  const statusOptions = ["inactive", "active", "highlight", "banned"];
  const productTypeOptions = ["Product", "Guide", "Agent"];

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

  //Product ID
  if (data.productID) {
    if (!validator.isLength(data.productID, { min: 24, max: 24 })) {
      errors.productID = "Product ID is invalid length";
    }
    if (!validator.matches(data.productID, regex)) {
      errors.productID = "Product ID is invalid string";
    }
    if (validator.isEmpty(data.productID)) {
      errors.productID = "Product ID is required";
    }
  } else {
    errors.productID = "Product ID is required";
  }

  //Product Type
  if (data.productType) {
    if (!validator.contains(productTypeOptions, data.productType)) {
      errors.text = "Product Type must be either Product, Guide, or Agent";
    }
    if (validator.isEmpty(data.productType)) {
      errors.productType = "Product Type is required";
    }
  } else {
    errors.productType = "Product Type is required";
  }

  //Rating
  if (data.rating) {
    if (!validator.isNumber(data.rating, { min: 0, max: 5 })) {
      errors.text = "Review rating must be between 0 and 5";
    }
    if (validator.isEmpty(data.rating)) {
      errors.rating = "Review rating is required";
    }
  } else {
    errors.rating = "Review rating is required";
  }

  //Review Title
  if (data.title) {
    if (!validator.isLength(data.title, { min: 2, max: 100 })) {
      errors.title = "Review must be between 2 and 100 characters";
    }

    if (validator.isEmpty(data.title)) {
      errors.title = "Review title is required";
    }
  } else {
    errors.title = "Review title is required";
  }

  //Review Text
  if (data.text) {
    if (!validator.isLength(data.text, { min: 2, max: 300 })) {
      errors.text = "Review must be between 2 and 300 characters";
    }
    if (validator.isEmpty(data.text)) {
      errors.text = "Review text is required";
    }
  } else {
    errors.text = "Review text is required";
  }

  //review status
  if (data.status) {
    if (!validator.contains(statusOptions, data.status)) {
      errors.text =
        "Status must be either active, inactive, highlight, or banned";
    }
    if (validator.isEmpty(data.staus)) {
      errors.text = "Review status can not be empty";
    }
  }

  return {
    errors: errors,
    isValid: is_Empty(errors)
  };
};

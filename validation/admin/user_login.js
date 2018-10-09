const validator = require('validator');
const is_Empty = require('../is_Empty');

module.exports = function validate(data) {
	let errors = {};

	//turn empty values into strings
	data.email = !is_Empty(data.email) ? data.email : '';
	data.password = !is_Empty(data.password) ? data.password : '';

	//email validation
	if (!validator.isEmail(data.email)) {
		errors.email = 'Username is invalid';
	}

	if (validator.isEmpty(data.email)) {
		errors.email = 'Username is required';
	}

	//password validation
	if (validator.isEmpty(data.password)) {
		errors.password = 'Password is required';
	}

	return {
		errors: errors,
		isValid: is_Empty(errors),
	};
};

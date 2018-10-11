const validator = require('validator');
const is_Empty = require('../is_Empty');
const flatten = require('flat');

module.exports = function validate(data) {
	let errors = {};
	const telephoneCheck = new RegExp('^[ -+#0-9]{8,20}$');
	const passwordCheck = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
	);
	const data_flat = flatten(data);

	//convert all null, undefined, empty objects to empty strings
	function emptyOrString(property) {
		return !is_Empty(property) ? property : '';
	}

	//loop through all the object properties
	for (var property in data_flat) {
		if (Object.prototype.hasOwnProperty.call(data, property)) {
			data[property] = emptyOrString(data[property]);
		}
	}

	//name validation
	if (!validator.isLength(data.name, { min: 2, max: 50 })) {
		errors.name = 'Name must be between 2 and 50 characters';
	}

	if (validator.isEmpty(data.name)) {
		errors.name = 'Name is required';
	}

	//email validation
	if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (validator.isEmpty(data.email)) {
		errors.email = 'Email is required';
	}

	//password validation
	if (!validator.matches(data.password, passwordCheck)) {
		errors.password =
			'Password must contain a least 8 letters, including 1 uppercase and 1 special character';
	}

	if (
		!validator.isLength(data.password, {
			min: 8,
		})
	) {
		errors.password =
			'Password must contain a least 8 letters, including 1 uppercase and 1 special character';
	}

	if (validator.isEmpty(data.password)) {
		errors.password = 'Password is required';
	}

	//password_confirm validation
	if (!validator.equals(data.password, data.confirm)) {
		errors.confirm = 'Passwords do not match';
	}

	if (validator.isEmpty(data.confirm)) {
		errors.confirm = 'Password Confirm is required';
	}

	//telephone validation
	if (!is_Empty(data.telephone)) {
		if (!validator.matches(data.telephone, telephoneCheck)) {
			errors.telephone = 'Invalid Telephone Number';
		}
		if (!validator.isLength(data.telephone, { min: 8, max: 20 })) {
			errors.telephone =
				'Your Telephone must be between 2 and 40 characters';
		}
	}

	//mobile validation - optional
	if (!is_Empty(data.mobile)) {
		if (!validator.matches(data.mobile, telephoneCheck)) {
			errors.mobile = 'Invalid Mobile Number';
		}
		if (
			!validator.isLength(data.mobile, {
				min: 8,
				max: 20,
			})
		) {
			errors.mobile = 'Your Mobile must be between 2 and 40 characters';
		}
	}

	//city validation
	if (!is_Empty(data.city)) {
		if (validator.isEmpty(data.city)) {
			errors.city = 'City is required';
		}
	}

	//country validation
	if (!is_Empty(data.country)) {
		if (validator.isEmpty(data.country)) {
			errors.country = 'Country is required';
		}
	}

	//social Media
	const socialMedia = [
		'facebook',
		'twitter',
		'instagram',
		'line',
		'wechat',
		'linkedin',
		'whatsapp',
	];

	socialMedia.map((social, i, socialMedia) => {
		if (!is_Empty(data[social])) {
			if (!validator.isURL(data[social])) {
				errors[social] = 'Enter a valid URL';
			}
		}
	});

	//newsletters
	const newsletters = [
		'productNews',
		'websiteNews',
		'guideNews',
		'agentNews',
		'competitionNews',
	];

	return {
		errors: errors,
		isValid: is_Empty(errors),
	};
};

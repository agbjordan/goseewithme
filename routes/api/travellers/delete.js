//load models
const Users = require('../../../models/Users');
const Traveller = require('../../../models/TravellerProfiles');

//validation
const validator = require('validator');

module.exports = function deleteTraveller(req, res) {
	let errors = {};
	const regex = new RegExp('^[a-zA-Z0-9]*$');

	//validate userID
	if (!req.params.id) {
		errors.id = 'Traveller ID is not provided';
		return res.status(404).json(errors);
	}
	if (typeof req.params.id !== 'string') {
		errors.id = 'Traveller ID is not valid, must be a string';
		return res.status(404).json(errors);
	}
	if (!validator.isLength(req.params.id, { min: 24, max: 24 })) {
		errors.id = 'Traveller ID is not valid, must be 24 characters';
		return res.status(404).json(errors);
	}
	if (!validator.matches(req.params.id, regex)) {
		errors.id = 'Traveller ID is not a valid format';
		return res.status(404).json(errors);
	}

	//find traveller profile and remove
	Traveller.findOneAndRemove({ user: req.params.id })
		.exec()
		.catch(err => {
			console.log(err);
			return res.status(400).json(err.response.data);
		});

	//find traveller user account and remove
	Users.findOneAndRemove({ _id: req.params.id })
		.exec()
		.catch(err => {
			console.log(err);
			return res.status(400).json(err.response.data);
		});
};

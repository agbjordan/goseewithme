//functions
const Traveller = require('../../../models/Users');

module.exports = function getAllTravellers(req, res) {
	let errors = {};

	Traveller.find({ role: 'traveller' })
		.sort('name')
		.then(result => {
			return res.status(200).json(result);
		})
		.catch(err => {
			return res.status(404).json(err.response.data);
		});
};

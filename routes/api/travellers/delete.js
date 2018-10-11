//load models//require models
const User = require('../../../models/Users');
const Profile = require('../../../models/TravellerProfiles');
const dbFunctions = require('../../../functions/dbFunctions');

module.exports = function deleteProfile(req, res) {
	let errors = {};
	const dbSet = new dbFunctions();

	//find traveller profile and remove
	let travellerProfile = dbSet.removeByUser({
		model: Profile,
		userid: req.params.id,
	});

	//return promise
	travellerProfile.then(result => {
		//find traveller account and remove
		let travellerUser = dbSet.removeById({
			model: User,
			userid: req.params.id,
		});

		//return promise
		travellerUser.then(result => {
			return res.status(200).json(result);
		});

		//catch error
		travellerUser.catch(err => {
			return res.status(404).json(err.response.data);
		});
	});

	//catch error
	travellerProfile.catch(err => {
		return res.status(404).json(err.response.data);
	});
};

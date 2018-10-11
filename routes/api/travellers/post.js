//dependencies
const flatten = require('flat');
const moment = require('moment');

//models
const Profile = require('../../../models/TravellerProfiles');

//functions
const propFunctions = require('../../../functions/propFunctions');
const dbFunctions = require('../../../functions/dbFunctions');
const userFunctions = require('../../../functions/userFunctions');

//validator
const validate = require('../../../validation/travellers/profile');

module.exports = function post_Profile_create(req, res) {
	const db = new dbFunctions();
	const propFun = new propFunctions();
	const userFun = new userFunctions();
	const { errors, isValid } = validate(req.body);
	const profileFields = {
		user: req.body.id,
		contactInfo: {},
		socialMedia: {},
		newsletters: {},
		follows: [],
	};
	const personalProps = ['profileImg'];
	const contactInfoProps = [
		'telephone',
		'mobile',
		'email',
		'addressLine01',
		'addressLine02',
		'city',
		'country',
		'state',
		'zipcode',
	];
	const socialMediaProps = [
		'facebook',
		'twitter',
		'line',
		'wechat',
		'whatsapp',
		'linkedin',
		'instagram',
	];
	const newsletterProps = [
		'productNews',
		'websiteNews',
		'agentNews',
		'guideNews',
		'competitionNews',
	];

	//validate input data
	if (!isValid) {
		return res.status(400).json(errors);
	}

	//loop through all the body object properties
	for (var property in personalProps) {
		if (typeof req.body[personalProps[property]] !== 'undefined') {
			profileFields[personalProps[property]] =
				req.body[personalProps[property]];
		}
	}
	propFun.updateAllUndefinedProps({
		arr: contactInfoProps,
		objNew: profileFields.contactInfo,
		bodyObj: req.body,
	});
	propFun.updateAllUndefinedProps({
		arr: socialMediaProps,
		objNew: profileFields.socialMedia,
		bodyObj: req.body,
	});
	propFun.updateAllUndefinedProps({
		arr: newsletterProps,
		objNew: profileFields.newsletters,
		bodyObj: req.body,
	});

	//follows
	if (typeof req.body.follows !== 'undefined') {
		profileFields.follows = req.body.follows.split(',');
	}

	let profileTraveller = userFun.getByUserID({
		userid: req.body.id,
		model: Profile,
	});

	profileTraveller.then(profile => {
		if (profile) {
			//UPDATE PROFILE
			db.create({
				model: Profile,
				userid: req.body.id,
				data: flatten(profileFields),
				res: res,
			});
		} else {
			//CREATE PROFILE
			//Save Profile
			new Profile(flatten(profileFields))
				.save()
				.then(profile => res.json(profile))
				.catch(err => console.log(err));
		}
	});

	profileTraveller.catch(err => console.log(err));
};

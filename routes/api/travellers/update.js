const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const flatten = require('flat');
const moment = require('moment');

// require models
const User = require('../../../models/Users');
const Profile = require('../../../models/TravellerProfiles');

//functions files
const validate = require('../../../validation/travellers/registeration');
const propFunctions = require('../../../functions/propFunctions');
const dbFunctions = require('../../../functions/dbFunctions');
const userFunctions = require('../../../functions/userFunctions');

module.exports = function del(req, res) {
	const { errors, isValid } = validate(req.body);
	const db = new dbFunctions();
	const propFun = new propFunctions();
	const userFun = new userFunctions();
	const role = 'traveller';
	const msg = { userExists: 'Email already exists.' };

	const profileFields = {
		user: '',
		profilePic: '',
		contactInfo: {},
		socialMedia: {},
		newsletters: {},
		follows: [],
	};

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

	//check that admin is logged in
	if (!req.user._id) {
		errors.name = 'Administrator is not logged in';
		return res.status(400).json(errors);
	}

	//validate input data
	if (!isValid) {
		return res.status(400).json(errors);
	}

	//does user already exist
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = msg.userExists;
			return res.status(400).json(errors);
		}

		//gravatar profile image from email
		const avatar = gravatar.url(req.body.email, {
			s: 200, //size
			r: 'pg', //rating
			d: 'mm', //default
		});

		//create new user
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			avatar: avatar,
			role: role,
		});

		//hash password using bcryptjs
		bcrypt.genSalt(10, (err, salt) => {
			if (err) throw err;
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				//update password with hash value
				newUser.password = hash;
				//save new user
				newUser
					.save()
					// .then(user => res.json(user))
					.then(user => {
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

						new Profile({
							user: newUser._id,
							profilePic: profileFields.profilePic,
							contactInfo: flatten(profileFields.contactInfo),
							socialMedia: flatten(profileFields.socialMedia),
							newsletters: flatten(profileFields.newsletters),
							follows: [],
						})
							.save()
							.then(profile => res.json(profile))
							.catch(err => console.log(err));
					})
					.catch(err => console.log(err));
			});
		});
	});
};

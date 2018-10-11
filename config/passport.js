const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/Users');
const Administrator = require('../models/Administrators');
const { jwtKey } = require('../config/keys-dev');
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtKey;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then(user => {
					if (user) {
						return done(null, user);
					}
					Administrator.findById(jwt_payload.id)
						.then(admin => {
							if (admin) {
								return done(null, admin);
							}
							return done(null, false);
						})
						.catch(err => console.log(err));
				})
				.catch(err => console.log(err));
		})
	);
};

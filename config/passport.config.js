const { ExtractJwt } = require('passport-jwt');

const { Strategy, ExtractJwt } = require('passport-jwt');

const User = require('../models/user.models');
const config = require('./database.config');

module.exports = (passport) => {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = process.env.SECRET;

	passport.use(
		new Strategy(opts, (jwt_payload, done) => {
			User.getUserById(jwt_payload._id, (err, user) => {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		})
	);
};

const { Router } = require('express');
const router = Router();
const passport = require('passport');
const {} = require('jsonwebtoken');

const User = require('../models/user.models');

router.post('/register', (req, res, next) => {
	console.log(req.body);
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.addUser(newUser, (err, user) => {
		if (err) {
			res.json({ success: false, msg: 'Failed to register user' });
		} else {
			res.json({ sucess: true, msg: 'User registered' });
		}
	});
});

router.post('/authenticate', (req, res, next) => {
	res.send('Authenticate');
});

router.get('/profile', (req, res, next) => {
	res.send('profile');
});

module.exports = router;

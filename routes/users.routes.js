const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const User = require('../models/user.models');
const { authorize } = require('../middleware/auth.middleware');

router.post('/register', async (req, res, next) => {
	try {
		const { name, email, username, password } = await req.body;

		let newUser = new User({
			name,
			email,
			username,
			password
		});

		User.addUser(newUser);
		res.json({ success: true, msg: 'User Created' });
	} catch (err) {
		res.status(500);
	}
});

router.post('/authenticate', async (req, res, next) => {
	try {
		const { username, password } = await req.body;
		const user = await User.getUserByUsername(username);
		if (!user) {
			res.status(400).json({ success: false, msg: 'User not found' });
		}

		const isMatch = await User.comparePassword(password, user.password);
		console.log(isMatch)
		if (isMatch === false) {
			res.status(400).json({ success: false, msg: 'Wrong Password' });
		} else {
			const token = jwt.sign({ data: user }, secret, {
				expiresIn: 604800
			});
			res.json({
				success: true,
				token: token,
				user: {
					id: user._id,
					name: user.name,
					username: user.username,
					email: user.email
				}
			});
		}
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/profile', authorize, (req, res, next) => {
	const user = req.user;
	res.json({ user: user });
});

module.exports = router;

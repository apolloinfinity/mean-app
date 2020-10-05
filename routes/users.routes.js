const { Router } = require('express');
const router = Router();

router.get('/register', (req, res, next) => {
	res.send('register');
});

router.get('/authenticate', (req, res, next) => {
	res.send('Authenticate');
});

router.get('/profile', (req, res, next) => {
	res.send('profile');
});

router.get('/validate', (req, res, next) => {
	res.send('validate');
});

module.exports = router;

const jwt = require('jsonwebtoken');
const { Bearer } = require('permit');
const secret = process.env.SECRET;

const permit = new Bearer();

exports.authorize = async (req, res, next) => {
	try {
		const token = permit.check(req);
		// console.log(token);
		if (!token) {
			return res.status(401).json({
				success: false,
				msg: 'Authentication failed'
			});
		}

		const payload = jwt.verify(token, secret);
		console.log('Data from payload is ' + payload);
		req.user = payload.data.username;
		next();
	} catch (err) {
		res.status(400).json({ success: 'nein', msg: err });
	}
};

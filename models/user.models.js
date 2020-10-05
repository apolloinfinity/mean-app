const { model, Schema } = require('mongoose');
const { genSalt, hash } = require('bcryptjs');

const UserSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = (module.exports = model('User', UserSchema));

module.exports.getUserById = (id, cb) => {
	User.findById(id, cb);
};

module.exports.getUserByUsername = (username, cb) => {
	const query = { username: username };
	User.find(query, cb);
};

module.exports.addUser = (newUser, cb) => {
	let salt = 10;
	genSalt(salt, (err, salt) => {
		hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser.save(cb);
		});
	});
};

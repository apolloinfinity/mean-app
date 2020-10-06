const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

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

module.exports.getUserById = (id) => {
	User.findById(id);
};

module.exports.getUserByUsername = async (username) => {
	const query = { username };
	return await User.findOne(query);
};

module.exports.addUser = async (newUser) => {
	try {
		const user = new User(newUser);
		const hash = await bcrypt.hash(newUser.password, 10);
		user.password = hash;
		return await user.save();
	} catch (err) {
		throw err;
	}
};

module.exports.comparePassword = async (clientPassword, hashed) => {
	try {
		return await bcrypt.compare(clientPassword, hashed);
	} catch (err) {
		throw err;
	}
};

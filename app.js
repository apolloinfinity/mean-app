const path = require('path');

const express = require('express');
const cors = require('cors');
const passport = require('passport');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = require('./config/database.config');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
const port = process.env.PORT || 3000;

const users = require('./routes/users.routes');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.config')(passport);

app.get('/', (req, res) => {
	res.send('Invalid endpoint');
});

app.use('/users', users);
app.listen(port, () => {
	console.log(`Server started on port http://localhost:${port}`);
});

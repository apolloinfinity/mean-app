const path = require('path');

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('morgan');

const connectDB = require('./config/database.config');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
const port = process.env.PORT || 3000;

const users = require('./routes/users.routes');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', users);

app.get('/', (req, res) => {
	res.send('Invalid endpoint');
});

app.listen(port, () => {
	console.log(`Server started on port http://localhost:${port}`);
});

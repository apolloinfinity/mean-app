const path = require('path');

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();
const port = 3000 || process.env.PORT;

const users = require('./routes/users.routes');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Invalid endpoint');
});

app.use('/users', users);
app.listen(port, () => {
	console.log(`Server started on port http://localhost:${port}`);
});

const mongoose = require('mongoose');
const config = require('config');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connect(config.db, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

module.exports = mongoose.connection;

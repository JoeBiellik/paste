const config = require('config');
const util = require('util');
const mongoose = require('mongoose');

module.exports = () => {
	mongoose.Promise = global.Promise;

	mongoose.connection.once('open', util.log.bind(util, 'MongoDB connection open'));
	mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

	mongoose.set('useCreateIndex', true);

	mongoose.connect(config.db, {
		useNewUrlParser: true
	});

	return mongoose.connection;
};

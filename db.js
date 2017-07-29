const config = require('config');
const util = require('util');
const mongoose = require('mongoose');

module.exports = () => {
	mongoose.Promise = global.Promise;

	mongoose.connection.once('open', util.log.bind(util, 'MongoDB connection open'));
	mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

	mongoose.connect(config.db, {
		useMongoClient: true
	});

	return mongoose.connection;
};

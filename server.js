const app = require('./app');
const config = require('config');

module.exports = app.listen(process.env.PORT || config.port, process.env.HOST || config.host);

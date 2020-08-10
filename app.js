const Koa = require('koa');
const app = new Koa();
const config = require('config');
const path = require('path');
const router = require('./router');
require('./db');

app.keys = config.keys;
app.proxy = true;

if (process.env.NODE_ENV === 'production') {
	app.silent = true;

	app.use(require('koa-pino-logger')({
		base: null
	}));
} else {
	app.use(require('koa-logger')());
}

app.use(require('koa-helmet')({
	hsts: false,
	frameguard: {
		action: 'deny'
	},
	referrerPolicy: {
		policy: 'strict-origin'
	},
	contentSecurityPolicy: {
		directives: {
			'default-src': ["'none'"],
			'base-uri': ["'none'"],
			'connect-src': ["'self'"],
			'font-src': ["'self'", 'https://fonts.gstatic.com'],
			'form-action': ["'self'"],
			'frame-ancestors': ["'none'"],
			'img-src': ["'self'", 'https:', 'data:'],
			'object-src': ["'none'"],
			'script-src': ["'self'", 'https://cdnjs.cloudflare.com', 'https://code.jquery.com'],
			'style-src': ["'self'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
			'block-all-mixed-content': true
		}
	}
}));
app.use(require('koa-compress')());
app.use(require('koa-static-cache')(path.join(__dirname, 'public'), {
	maxAge: config.cacheAge
}));
app.use(require('koa-views')(path.join(__dirname, 'views'), {
	extension: 'pug'
}));

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;

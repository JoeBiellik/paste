const koa = require('koa');
const app = new koa();
const config = require('config');
const path = require('path');
const router = require('./router');
require('./db');

app.keys = config.keys;
app.proxy = true;

if (process.env.NODE_ENV == 'production') {
	app.on('error', (err, ctx) => console.error(ctx.request.ip, ctx.request.method, ctx.request.url, err.status, err.message));
} else {
	app.use(require('koa-logger')());
}

app.use(require('koa-compress')());
app.use(require('koa-static-cache')(path.join(__dirname, 'public'), {
	maxAge: config.cacheAge
}));
app.use(require('koa-views')(path.join(__dirname, 'views'), {
	extension: 'pug'
}));

app.use(router.routes());

app.use(async (ctx, next) => {
	await next();

	if (!ctx.status || ctx.status == 404) ctx.throw(404);
});

app.use(router.allowedMethods());

module.exports = app;

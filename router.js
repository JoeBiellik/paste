const router = require('koa-router')();
const config = require('config');
const pastes = require('./controllers/pastes');

router
	.get('/', async (ctx) => {
		ctx.set('Cache-Control', 'no-cache');

		await ctx.render('index', {
			pretty: config.prettyHtml,
			title: config.name,
			url: ctx.request.origin,
			expires: config.expires,
			highlights: config.highlights
		});
	})
	.post('/', pastes.create)
	.get('/:id', require('koa-conditional-get')(), require('koa-etag')(), pastes.view);

module.exports = router;

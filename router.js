const router = require('koa-router')();
const conditional = require('koa-conditional-get')();
const etag = require('koa-etag')();
const config = require('config');
const pastes = require('./controllers/pastes');

router
	.get('/', conditional, etag, async (ctx) => {
		ctx.set('Cache-Control', 'public');

		await ctx.render('index', {
			pretty: config.prettyHtml,
			title: config.name,
			url: ctx.request.origin,
			expires: config.expires,
			highlights: config.highlights
		});
	})
	.post('/', pastes.create)
	.get('/:id', conditional, etag, pastes.view);

module.exports = router;

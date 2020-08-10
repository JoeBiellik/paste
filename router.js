const config = require('config');
const router = require('koa-router')();
const conditional = require('koa-conditional-get')();
const etag = require('koa-etag')();
const body = require('koa-body')({
	json: false,
	multipart: true,
	formLimit: config.sizeLimit,
	textLimit: config.sizeLimit,
	formidable: {
		multiples: false,
		maxFileSize: require('bytes').parse(config.sizeLimit)
	},
	onError: (err, ctx) => {
		if (err.message.startsWith('maxFileSize')) {
			ctx.throw(400, 'Paste Exceeds Maximum Size (' + config.sizeLimit.toUpperCase() + ')');
		} else {
			ctx.throw(500, err.message);
		}
	}
});
const pastes = require('./controllers/pastes');

router
	.get('/', conditional, etag, pastes.index)
	.post('/', body, pastes.create)
	.get('/:id', conditional, etag, pastes.view);

module.exports = router;

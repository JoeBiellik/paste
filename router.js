var router = require('koa-router')();
var config = require('config');
var pastes = require('./controllers/pastes');

router.get('/', function *() {
	yield this.render('index', {
		pretty: config.prettyHtml,
		title: 'Paste',
		url: this.request.origin,
		expires: config.expires,
		highlights: config.highlights
	});
});

router.post('/', pastes.create);
router.get('/:id', pastes.view);

module.exports = router;

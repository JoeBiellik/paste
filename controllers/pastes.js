var config = require('config');
var Paste = require('../models/paste');

module.exports = {
	*view(next) {
		try {
			let paste = yield Paste.findOne({ link: this.params.id }).exec();
			let lang = Object.keys(this.query)[0];

			if (lang) {
				yield this.render('highlight', {
					pretty: config.prettyHtml,
					title: 'Paste ' + paste.link,
					paste: paste.paste,
					lang: lang
				});
			} else {
				this.type = 'text/plain';
				this.body = paste.paste;
			}
		} catch (ex) {
			this.throw('Paste Not Found', 404);
		}
	},

	*create(next) {
		if (this.request.body.fields && this.request.body.fields.paste) {
			this.request.body.paste = this.request.body.fields.paste;
		}
		if (this.request.body.fields && this.request.body.fields.highlight) {
			this.request.body.highlight = this.request.body.fields.highlight;
		}

		let paste = new Paste({
			paste: this.request.body.paste
		});

		yield paste.save();

		let link = paste.link;

		if (this.request.body.highlight) {
			link += '?' + this.request.body.highlight;
		}

		if (Object.keys(this.query).includes('redirect')) {
			this.redirect(link);
		} else {
			this.body = this.request.origin + '/' + link + '\n';
		}
	}
};

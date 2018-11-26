const config = require('config');
const Paste = require('../models/paste');

module.exports = {
	async view(ctx) {
		try {
			let paste = await Paste.findById(ctx.params.id).exec();
			let lang = Object.keys(ctx.query)[0];

			if (lang) {
				await ctx.render('highlight', {
					pretty: config.prettyHtml,
					title: config.name + ' ' + paste.id,
					paste: paste.paste,
					lang: lang
				});
			} else {
				ctx.type = 'text/plain';
				ctx.body = paste.paste;
			}
		} catch (ex) {
			ctx.throw(404, 'Paste Not Found');
		}
	},

	async create(ctx) {
		if (ctx.request.body.fields) {
			if (ctx.request.body.fields.paste) {
				ctx.request.body.paste = ctx.request.body.fields.paste;
			}
			if (ctx.request.body.fields.highlight) {
				ctx.request.body.highlight = ctx.request.body.fields.highlight;
			}
			if (ctx.request.body.fields.expire) {
				ctx.request.body.expire = ctx.request.body.fields.expire;
			}
		}

		if (!ctx.request.body.expire) {
			ctx.request.body.expire = config.expiresDefault;
		}

		let paste = new Paste({
			paste: ctx.request.body.paste,
			expiresAt: new Date(Date.now() + ctx.request.body.expire * 1000)
		});

		await paste.save();

		let link = paste.id;

		if (ctx.request.body.highlight) {
			link += '?' + ctx.request.body.highlight;
		}

		if (Object.keys(ctx.query).includes('redirect')) {
			ctx.redirect(link);
		} else {
			ctx.body = ctx.request.origin + '/' + link + '\n';
		}
	}
};

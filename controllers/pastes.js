const config = require('config');
const fs = require('fs').promises;
const Paste = require('../models/paste');

module.exports = {
	async view(ctx) {
		try {
			const paste = await Paste.findById(ctx.params.id).exec();
			const lang = (Object.keys(ctx.query)[0] || '').toLowerCase();

			ctx.set('Cache-Control', 'public');
			ctx.set('Expires', paste.expiresAt.toUTCString());

			if (lang) {
				await ctx.render('highlight', {
					pretty: config.prettyHtml,
					title: config.name + ' ' + paste.id,
					paste: paste.paste,
					lang: Object.keys(config.highlights).includes(lang) ? lang : 'unknown'
				});
			} else {
				ctx.body = paste.paste;
			}
		} catch (ex) {
			ctx.throw(404, 'Paste Not Found', {
				headers: {
					'Cache-Control': 'no-cache'
				}
			});
		}
	},

	async create(ctx) {
		ctx.set('Cache-Control', 'no-cache');

		// Request body
		if (!ctx.request.body.paste && ctx.request.files) {
			try {
				// Request body, xxx
				let path = Object.values(ctx.request.files)[0].path;

				// Request body, paste=xxx
				if (ctx.request.files.paste) {
					path = ctx.request.files.paste.path;
				}

				ctx.request.body.paste = await fs.readFile(path);

				try {
					await fs.unlink(path);
				} catch (ex) {
					// Ignore
				}
			} catch (ex) {
				ctx.throw(400, 'Error Processing Request Body', {
					headers: {
						'Cache-Control': 'no-cache'
					}
				});
			}
		}

		// Expiry multiplier
		try {
			if (ctx.request.body.expire && ctx.request.body.multiplier) {
				ctx.request.body.expire = ctx.request.body.expire * ctx.request.body.multiplier;
			}
		} catch (ex) {
			ctx.throw(400, 'Error Processing Paste Expiry', {
				headers: {
					'Cache-Control': 'no-cache'
				}
			});
		}

		// Raw request body
		if (typeof ctx.request.body === 'string') {
			ctx.request.body = {
				paste: ctx.request.body
			};
		}

		if (!ctx.request.body.paste) {
			ctx.throw(400, 'Error No Paste Provided', {
				headers: {
					'Cache-Control': 'no-cache'
				}
			});
		}

		// /?expire=xxx
		if (!ctx.request.body.expire && ctx.query.expire) {
			ctx.request.body.expire = ctx.query.expire;
		}

		// No expire provided
		if (!ctx.request.body.expire) {
			ctx.request.body.expire = config.expires.default.value * config.expires.default.multiplier;
		}

		const paste = new Paste({
			paste: ctx.request.body.paste,
			expiresAt: new Date(Date.now() + ctx.request.body.expire * 1000)
		});

		try {
			await paste.save();
		} catch (ex) {
			ctx.throw(500, 'Error Storing Paste', {
				headers: {
					'Cache-Control': 'no-cache'
				}
			});
		}

		// /?highlight=xxx
		if (!ctx.request.body.highlight && ctx.query.highlight) {
			ctx.request.body.highlight = ctx.query.highlight;
		}

		// /?xxx
		if (!ctx.request.body.highlight && !ctx.query.highlight && ctx.query) {
			ctx.request.body.highlight = Object.keys(ctx.query).filter(k => k != 'redirect' && k != 'expire')[0];
		}

		let highlight = '';

		if (ctx.request.body.highlight && Object.keys(config.highlights).includes(ctx.request.body.highlight)) {
			highlight = '?' + ctx.request.body.highlight;
		}

		if (Object.keys(ctx.query).includes('redirect')) {
			ctx.redirect(ctx.request.origin + '/' + paste.id + highlight);
		} else {
			ctx.body = ctx.request.origin + '/' + paste.id + highlight + '\n';
		}
	}
};

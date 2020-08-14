const config = require('config');
const fs = require('fs').promises;
const isBinaryFile = require('isbinaryfile').isBinaryFile;
const detectCharacterEncoding = require('detect-character-encoding');
const encoding = require('encoding');
const Paste = require('../models/paste');

module.exports = {
	async index(ctx) {
		await ctx.render('index', {
			pretty: config.prettyHtml,
			title: config.name,
			url: ctx.request.origin,
			expires: config.expires,
			highlights: config.highlights
		});
	},

	async view(ctx) {
		try {
			const paste = await Paste.findById(ctx.params.id).exec();
			const lang = (Object.keys(ctx.query)[0] || '').toLowerCase();

			ctx.set('Expires', paste.expiresAt.toUTCString());
			ctx.set('Last-Modified', paste.updatedAt.toUTCString());

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
		} catch {
			ctx.throw(404, 'Paste Not Found');
		}
	},

	/* eslint-disable-next-line complexity */
	async create(ctx) {
		ctx.set('Cache-Control', 'no-cache');

		// File body
		if (ctx.request.files && Object.keys(ctx.request.files).length > 0) {
			// Request body, xxx
			let path = Object.values(ctx.request.files)[0].path;

			try {
				// Request body, paste=xxx
				if (ctx.request.files.paste) {
					path = ctx.request.files.paste.path;
				}

				if (await isBinaryFile(path)) ctx.throw('Binary file');

				const data = await fs.readFile(path);
				const detectedEncoding = detectCharacterEncoding(data);

				ctx.request.body.paste = encoding.convert(data, 'utf8', detectedEncoding.encoding).toString();
			} catch {
				ctx.throw(400, 'Bad Paste Body');
			} finally {
				try {
					await fs.unlink(path);
				} catch {
					// Ignore
				}
			}
		}

		// Raw body
		if (typeof ctx.request.body === 'string') {
			ctx.request.body = {
				paste: ctx.request.body
			};
		}

		if (!ctx.request.body.paste) {
			ctx.throw(400, 'No Paste Provided');
		}

		// Expiry multiplier
		try {
			if (ctx.request.body.expire && ctx.request.body.multiplier) {
				ctx.request.body.expire *= ctx.request.body.multiplier;
			}
		} catch {
			ctx.throw(400, 'Bad Paste Expiry');
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
			ip: ctx.request.ip,
			expiresAt: new Date(Date.now() + (ctx.request.body.expire * 1000))
		});

		try {
			await paste.save();
		} catch (err) {
			ctx.throw(500, err.message);
		}

		// /?highlight=xxx
		if (!ctx.request.body.highlight && ctx.query.highlight) {
			ctx.request.body.highlight = ctx.query.highlight;
		}

		// /?xxx
		if (!ctx.request.body.highlight && !ctx.query.highlight && ctx.query) {
			ctx.request.body.highlight = Object.keys(ctx.query).find((k) => k !== 'redirect' && k !== 'expire');
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

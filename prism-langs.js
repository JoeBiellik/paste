/* eslint-disable no-console */

const https = require('https');

// Match version number to included copy
https.get('https://raw.githubusercontent.com/PrismJS/prism/v1.20.0/components.json', (res) => {
	res.setEncoding('utf8');

	let body = '';
	res.on('data', (data) => {
		body += data;
	});

	res.on('end', () => {
		const components = JSON.parse(body);

		const highlights = {};

		// Split markup
		for (const id in components.languages.markup.aliasTitles) {
			if (!Object.prototype.hasOwnProperty.call(components.languages.markup.aliasTitles, id)) continue;

			components.languages[id] = {
				title: components.languages.markup.aliasTitles[id]
			};
		}

		for (const id in components.languages) {
			if (id === 'meta') continue;
			if (id === 'markup') continue;

			const lang = components.languages[id];
			const name = lang.title || lang;

			const contents = [];
			let alias = lang.alias;
			if (typeof alias === 'string') alias = [alias];

			if (alias) {
				for (let i = 0, l = alias.length; i < l; i++) {
					contents.push(alias[i]);
				}
			}

			highlights[id] = {
				name
			};

			if (contents.length > 0) {
				highlights[id].alias = contents;
			}
		}

		// Default option
		highlights[''] = {
			name: 'Plain text'
		};

		// Manual overrides
		highlights.asm6502.alias = ['asm'];
		highlights.aspnet.alias = ['dotnet'];
		highlights.sqf.name = 'SQF';
		highlights.cpp.alias = ['cpp'];
		highlights.csharp.alias.push('csharp', '.net');
		highlights.csp.alias = ['csp'];
		highlights['dns-zone-file'].alias.push('bind', 'named');
		highlights.hpkp.alias = ['hpkp'];
		highlights['js-extras'].name = 'JavaScript Extras';
		highlights['js-templates'].name = 'JavaScript Templates';
		highlights.json.alias = ['javascript object notation'];
		highlights.json5.alias = ['javascript object notation'];
		highlights.jsonp.alias = ['javascript object notation'];
		highlights.nasm.alias = ['assembly'];
		highlights.protobuf.alias = ['protobuf'];
		highlights.pug.alias = ['jade'];
		highlights.regex.alias = ['regular expression'];
		highlights['shell-session'].alias = ['terminal', 'console'];
		highlights['solution-file'].name = 'Visual Studio Solution';
		highlights['solution-file'].alias.push('.net', 'dotnet');
		highlights.vbnet.name = 'Visual Basic .NET';
		highlights.vbnet.alias = ['vb', 'dotnet'];
		highlights.wasm.alias = ['wasm', 'asm'];

		// Sort
		const ordered = {};
		Object.keys(highlights).sort().forEach((key) => {
			ordered[key] = highlights[key];
		});

		// Format output
		console.log(JSON.stringify(ordered)
			.slice(1, -1)
			.replace(/},"/g, '},\n"')
			.replace(/:/g, ': ')
			.replace(/,/g, ', '));
	});
});

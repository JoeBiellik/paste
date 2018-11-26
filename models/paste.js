const mongoose = require('mongoose');
const shortid = require('shortid');

const paste = new mongoose.Schema({
	_id: { type: String, default: shortid.generate },
	paste: { type: String },
	expiresAt: { type: Date, expires: 0, default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) }
}, {
	timestamps: true
});

module.exports = mongoose.model('Paste', paste);

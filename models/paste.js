const mongoose = require('mongoose');
const shortid = require('shortid');

const paste = new mongoose.Schema({
	_id: { type: String, default: shortid.generate },
	paste: { type: String },
	expiresAt: { type: Date, expires: 0 }
}, {
	timestamps: true
});

module.exports = mongoose.model('Paste', paste);

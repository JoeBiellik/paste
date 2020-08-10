const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const dictionary = require('nanoid-dictionary');
const nanoid = customAlphabet(dictionary.nolookalikes, 8);

const paste = new mongoose.Schema({
	_id: { type: String, default: nanoid },
	paste: { type: String },
	ip: { type: String },
	expiresAt: { type: Date, expires: 0 }
}, {
	timestamps: true
});

module.exports = mongoose.model('Paste', paste);

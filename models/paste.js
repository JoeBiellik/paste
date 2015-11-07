var mongoose = require('mongoose');
var shortId = require('short-mongo-id');

var paste = new mongoose.Schema({
	paste: { type: String },
	link: { type: String }
}, {
	timestamps: true
});

paste.pre('save', function(next) {
	if (this.isNew) {
		this.link = shortId(this._id);

		next();
	}
});

module.exports = mongoose.model('Paste', paste);

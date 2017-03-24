var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	createdDate: {
		type: Date,
		default: Date.now
	},
	completed: {
		type: Date
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: "Title can't be blank"
	},
	description: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Task', TaskSchema);
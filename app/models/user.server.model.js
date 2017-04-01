//Dependency Injection
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

//Schema
var UserSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	firstName: String,
	lastName: String,
	email: {
		type: String,
		index: true,
		trim: true,
		unique: true
	},
	username: {
		type: String,
		trim: true,
		unique: true
	},
	password: String,
	provider: String, //Strategy used to register the user
	providerId: String, //User udentifier for the auth strategy
	providerData: {}, //Store user object retrieved from OAuth providers
	currentGoals: [{
		type: Schema.ObjectId,
		ref: 'Goal'
	}],
	completedGoals: [{
		type: Schema.ObjectId,
		ref: 'Goal'
	}] 
});


//Pre-save middleware for hashing passwords
UserSchema.pre('save',
	function(next) {
		if (this.password) {
			var md5 = crypto.createHash('md5');
			this.password = md5.update(this.password).digest('hex');
		}

		next();
	}
);


//Checks hashed password against stored password
UserSchema.methods.authenticate = function(password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password === md5;
};



UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({username: possibleUsername},
		function(err, user) {
			if (!err) {
				if (!user) {
					callback(possibleUsername);
				} else {
					return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				}
			} else {
				callback(null);
			}
		}
	);
};


mongoose.model('User', UserSchema);






//Dependency Injection
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

//Exposed module
module.exports = function() {
	passport.use(new LocalStrategy(function(username, password, done) {
		console.log("local.js(" + username + ")");
		User.findOne({email: username},
			function(err, user) {
				if (err) {
					return done(err);
				}

				if (!user) {
					return done(null, false, {success: false, message: 'No account exists for this email'});
				}

				if (!user.authenticate(password)) {
					return done(null, false, {success: false, message: 'Invalid password'});
				}

				return done(null, user, {success: true, message: 'Sign in success!'});
			}
		);
	}));
};





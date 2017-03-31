//Dependency Injection========================================================
var User = require('mongoose').model('User');
var passport = require('passport');

//Private Functions===========================================================
var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				message = err.errors[errName].message;
			}
		}
	}

	return message;
};

//Exports======================================================================
//Serve login page
exports.renderLogin = function(req, res, next) {
	if (!req.user) {
		res.render('login', {
			title: 'Log-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};


//Serve register page
exports.renderRegister = function(req, res, next) {
	if (!req.user) {
		res.render('register', {
			title: 'Register Form',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};


//Uses User model to create new users based on HTTP request body. Local Auth
exports.register = function(req, res, next) {
	if (!req.user) {
		console.log(req.body);
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.json({success: false, message: err, nextUrl: '/register'});
			}

			//"req.login" method from passport module
			req.login(user, function(err) {
				if (err) {
					return next(err);
				}

				return res.json({success: true, message: err, nextUrl: '/dashboard'});
			});
		});
	} else {
		return res.json({success: true, nextUrl: '/dashboard'});
	}
};



//Uses OAuth to create new user
exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	},
	function(err, user) {
		if (err) {
			return done(err);
		} else {
			if (!user) {
				var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
				User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
					profile.username = availableUsername;
					user = new User (profile);

					user.save(function(err) {
						if (err) {
							var message = _this.errorMessage(err);
							req.flash('error', message);
							return res.redirect('/signup');
						}

						return done(err, user);
					});
				});
			} else {
				return done(err, user);
			}
		}
	});
};



//Logout user
exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};


//CRUD-------------------------------------------------------------------------
//Takes a json object and saves it as a new user
/* Example:
$ curl -X POST -H "Content-Type: application/json" -d '{"name": "Kevin", "email": "kevin@mitnick.com", "username": "Condor", "password": "AintNoBodyGotTimeForGoodPa$words!!!"}' localhost:1337/users
*/
exports.create = function(req, res, next) {
	console.log('users.server.controller.create();')
	var user = new User(req.body);
	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	})
}


//Lists all existing users
exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	})
}


//Returns JSON representation of req.user object. 
exports.read = function(req, res) {
	res.json(req.user);
}


//Populates req.user object, used as middleware 
exports.userByID = function(req, res, next, id) {
	User.findOne({
			_id: id
		},
		function(err, user) {
			if (err) {
				return next(err);
			} else {
				req.user = user;
				next();
			}
		}
	);
};


//Updates user by ID
/* Example:
curl -X PUT -H "Content-Type: application/json" -d '{"name": "UpdatedName"}' localhost:1337/users/[_id]
*/
exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err,user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	})
}


//Deletes user by ID
/*Example:
$ curl -X DELETE localhost:1337/users/[id]
*/
exports.delete = function(req, res, next) {
	User.findByIdAndRemove(req.user.id, req.body, function(err,user){
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	})
}


//Middleware checking whether a user is currently authenticated
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};










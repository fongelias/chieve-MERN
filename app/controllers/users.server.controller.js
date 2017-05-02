//Dependency Injection========================================================
var User = require('mongoose').model('User');
var Goal = require('mongoose').model('Goal');
var Task = require('mongoose').model('Task');
var passport = require('passport');
var parallel = require('async/parallel');
var each = require('async/each');

//Private Functions===========================================================
/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
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
/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
//Return a user's goals
exports.readGoals = function(req, res, next) {
	Goal.find({
		'_id': {$in: req.user.currentGoals}
	}, function(err, goals) {
		if (err) {
			return next(err);
		} else {
			console.log(goals);
			res.json(goals);
		}
	});
}


/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
//Return a user's goals
exports.readTaskList = function(req, res, next) {
	console.log('users.readTaskList()');
	Goal.find({
		'_id': {$in: req.user.currentGoals}
	}, function(err, goals) {
		if (err) {
			return next(err);
		} else {
			var taskList = [];
			each(goals, function(goal, callback) {
				Task.find({
					'goal': {$in: goal}
				}, function(err, tasks) {
					if(err) {
						callback('Could not retrieve Tasks');
					} else {
						taskList = taskList.concat(tasks);
						callback();
					}
				})
			}, function(err) {
				console.log('callback');
				if (err) {
					return next(err);
				} else {
					console.log(taskList);
					res.json(taskList);
				}
			});
			
		}
	});
}

/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
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

/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
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

/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
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

			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
			});

			return res.json({success: true, message: err, nextUrl: '/dashboard'});
		});
  	} else {
		return res.json({success: true, nextUrl: '/dashboard'});
	}
};

/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
//Uses User model to create new users based on HTTP request body. Local Auth.
//Adds a goal and a set of tasks.
exports.onboardRegister = function(req, res, next) {
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

			//Add a parallel here and nest it in
			//"req.login" method from passport module
			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
			});

			//Save Goal
			var goal = new Goal({"title": req.body.goalTitle});
			goal.creator = req.user;
			goal.save(function(err) {
				if (err) {
					console.log(err);
					return res.status(400).send({
						message: getErrorMessage(err)
					});
				} else {
					parallel([
					    function(callback) {
					    	//Update User to reflect new goal
					    	User.findByIdAndUpdate(
								req.user._id,
								{$push: {"currentGoals" : goal._id}},
								{safe: true, upsert: true},
							    function(err, model) {
							        console.log(err);
							        callback(err, true);
							    }
							);
					    },
					    function(callback) {
					    	//Used to activate callback
					    	var tasks_length = req.body.tasks.length;
					    	//Create Tasks
					    	for (i = 0; i < req.body.tasks.length; i++) {
					    		var task = new Task();
								task.goal = goal._id;
								task.creator = user._id;
								task.title = req.body.tasks[i];
								task.save(function(err) {
									if (err) {
										console.log(err);
										callback(err, true);
									} else {
										//Update Goal to reflect new task
										Goal.findByIdAndUpdate(
											goal._id,
											{$push: {"tasks" : task._id}},
											{safe: true, upsert: true},
										    function(err, model) {
										        console.log(err);
										        tasks_length--;
										        if (tasks_length == 0) {
										        	callback(err, true);
										        }
										    }
										);
									}
								});
					    	}
					    }
					],
					// optional callback
					function(err, results) {
					    // the results array will equal [true, true] if parallel functions worked
					    if (results[0] && results[1]) {
					    	return res.json({success: true, message: err, nextUrl: '/dashboard'});
					    } else {
					    	console.log(err);
					    	return res.status(400).send({
								message: getErrorMessage(err)
							});
					    }
					});
				}
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


/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
//Logout user
exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};


//CRUD-------------------------------------------------------------------------
/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
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


/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
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


/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
//Returns JSON representation of req.user object. 
exports.read = function(req, res) {
	res.json(req.user);
}


/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
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


/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
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


/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
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


/*X------XX------XX------XX------XX------XX------XX------XX------XX------X
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 * VISUAL DELIMITER FOR A FUNCTION---XX------XX------XX------XX------XX---
 *--X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X--
 *-X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X--X----X-
 *X------XX------XX------XX------XX------XX------XX------XX------XX------X
 */
//Middleware checking whether a user is currently authenticated
exports.requiresLogin = function(req, res, next) {
	console.log(req.isAuthenticated());
	if (!req.isAuthenticated()) {
		/*return res.status(401).send({
			message: 'User is not logged in'
		});*/
		return res.redirect('/');
	}
	next();
};










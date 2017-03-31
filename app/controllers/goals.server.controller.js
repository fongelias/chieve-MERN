//Dependency Injection========================================================
var Goal = require('mongoose').model('Goal');
var passport = require('passport');

//Private Functions===========================================================
var getErrorMessage = function(err) {
	if (err.errors) {
		for(var errName in err.errors) {
			if (err.errors[errName].message) {
				return err.errors[errName].message;
			}
		}
	} else {
		return 'Unknown server error';
	}
};


//Exports======================================================================


//CRUD-------------------------------------------------------------------------
//Takes a json object and saves it as a new goal
/* Example:
$ curl -X POST -H "Content-Type: application/json" -d '{"name": "Kevin", "email": "kevin@mitnick.com", "username": "Condor", "password": "AintNoBodyGotTimeForGoodPa$words!!!"}' localhost:1337/goals
*/
exports.create = function(req, res) {
	var goal = new Goal(req.body);
	goal.creator = req.user;
	goal.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(goal);
		}
	});
};



//Lists all existing goals
//sorts them by created property
//adds name and username fields to creator property
exports.list = function(req, res) {
	Goal.find().sort('-created').populate('creator', 'name username').exec(function(err, goals) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(goals);
		}
	});
};


//Returns JSON representation of req.goal object.
exports.read = function(req, res) {
	res.json(req.goal);
};


//Populates req.goal object, used as middleware 
exports.goalByID = function(req, res, next, id) {
	Goal.findById(id).populate('creator', 'name username').exec(function(err, goal) {
		if (err) {
			return next(err);
		}

		if (!goal) {
			return next(new Error('Failed to load goal ' + id));
		}

		req.goal = goal;
		next();
	});
};



//Updates goal by ID
/* Example:
curl -X PUT -H "Content-Type: application/json" -d '{"name": "UpdatedName"}' localhost:1337/goals/[_id]
*/
exports.update = function(req, res) {
	var goal = req.goal;
	goal.title = req.body.title;
	goal.description = req.body.description;
	goal.completed = req.body.completed;

	goal.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(goal);
		}
	});
};



//Deletes goal by ID
/*Example:
$ curl -X DELETE localhost:1337/goals/[id]
*/
exports.delete = function(req, res) {
	var goal = req.goal;
	goal.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(goal);
		}
	});
};



//Verifies current user is the creator of the current goal
//Uses req.goal and req.user objects
exports.hasAuthorization = function(req, res, next) {
	if (req.goal.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};












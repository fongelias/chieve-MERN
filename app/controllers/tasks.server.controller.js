//Dependency Injection========================================================
var Task = require('mongoose').model('Task');
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
//Takes a json object and saves it as a new task
/* Example:
$ curl -X POST -H "Content-Type: application/json" -d '{"name": "Kevin", "email": "kevin@mitnick.com", "username": "Condor", "password": "AintNoBodyGotTimeForGoodPa$words!!!"}' localhost:1337/tasks
*/
exports.create = function(req, res) {
	console.log('tasks.server.controller.create();')
	var task = new Task(req.body);
	task.creator = req.user;
	task.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			//Update Goal to reflect new task
			Goal.findByIdAndUpdate(
				task.goal,
				{$push: {"tasks" : task._id}},
				{safe: true, upsert: true},
			    function(err, model) {
			        console.log(err);
			    }
			);
			res.json(task);
		}
	});
};



//Lists all existing tasks
//sorts them by created property
//adds name and username fields to creator property
exports.list = function(req, res) {
	Task.find().sort('-created').populate('creator', 'name username').exec(function(err, tasks) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(tasks);
		}
	});
};


//Returns JSON representation of req.task object.
exports.read = function(req, res) {
	res.json(req.task);
};


//Populates req.task object, used as middleware 
exports.taskByID = function(req, res, next, id) {
	Task.findById(id).populate('creator', 'name username').exec(function(err, task) {
		if (err) {
			return next(err);
		}

		if (!task) {
			return next(new Error('Failed to load task ' + id));
		}

		req.task = task;
		next();
	});
};



//Updates task by ID
/* Example:
curl -X PUT -H "Content-Type: application/json" -d '{"name": "UpdatedName"}' localhost:1337/tasks/[_id]
*/
exports.update = function(req, res) {
	var task = req.task;
	task.title = req.body.title;
	task.description = req.body.description;
	task.completed = req.body.completed;

	task.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(task);
		}
	});
};



//Deletes task by ID
/*Example:
$ curl -X DELETE localhost:1337/tasks/[id]
*/
exports.delete = function(req, res) {
	var task = req.task;
	task.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(task);
		}
	});
};



//Verifies current user is the creator of the current task
//Uses req.task and req.user objects
exports.hasAuthorization = function(req, res, next) {
	if (req.task.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};












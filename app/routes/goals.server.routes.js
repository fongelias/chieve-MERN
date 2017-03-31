//Dependency Injection
var users = require('../../app/controllers/users.server.controller');
var tasks = require('../../app/controllers/tasks.server.controller');
var goals = require('../../app/controllers/goals.server.controller');


//Exposed module
module.exports = function(app) {
	//Post to '/api/goals' to create a goals, 
	//Get to get JSON for all goals
	app.route('/api/goals')
		.get(goals.list)
		.post(users.requiresLogin, goals.create);
	//Get using request param 'goalId' to retrieve JSON for one goal
	//Put to check if user is logged in and owns a goal, then updates an existing goal
	//Delete to check if user is logged in and owns a goal, then deletes an existing goal
	app.route('/api/goals/:goalId')
		.get(goals.read)
		.put(users.requiresLogin, goals.hasAuthorization, goals.update)
		.delete(users.requiresLogin, goals.hasAuthorization, goals.delete);

	//Request Params
	app.param('goalId', goals.goalByID);
}
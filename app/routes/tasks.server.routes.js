//Dependency Injection
var users = require('../../app/controllers/users.server.controller');
var tasks = require('../../app/controllers/tasks.server.controller');
var goals = require('../../app/controllers/goals.server.controller');


//Exposed module
module.exports = function(app) {
	//Post to '/api/tasks' to create a tasks, 
	//Get to get JSON for all tasks
	app.route('/api/tasks')
		.get(tasks.list)
		.post(users.requiresLogin, tasks.create);
	//Get using request param 'taskId' to retrieve JSON for one task
	//Put to check if user is logged in and owns a task, then updates an existing task
	//Delete to check if user is logged in and owns a task, then deletes an existing task
	app.route('/api/tasks/:taskId')
		.get(tasks.read)
		.put(users.requiresLogin, tasks.hasAuthorization, tasks.update)
		.delete(users.requiresLogin, tasks.hasAuthorization, tasks.delete);

	//Request Params
	app.param('taskId', tasks.taskByID);
}




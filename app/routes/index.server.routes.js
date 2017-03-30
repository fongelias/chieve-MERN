//Dependency Injection
var index = require('../controllers/index.server.controller');
var users = require('../../app/controllers/users.server.controller');

//Exposed module
module.exports = function(app) {
	//Uses index.renderIndex to respond to requests to the root path
	app.get('/', index.renderIndex);
	//Uses index.renderIndex to respond to requests to the root path
	app.route('/dashboard')
		.get(users.requiresLogin, index.renderDashboard);
}
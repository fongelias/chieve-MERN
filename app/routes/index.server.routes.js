//Dependency Injection
var index = require('../controllers/index.server.controller');

//Exposed module
module.exports = function(app) {
	//Uses index.render to respond to requests to the root path
	app.get('/', index.renderIndex);
}
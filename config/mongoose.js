var config = require('./config')
var mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);

	//Models
	require('../app/models/user.server.model');
	require('../app/models/task.server.model');

	return db;
};
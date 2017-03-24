//Dependency Injection
var users = require('../../app/controllers/users.server.controller');
var passport = require('passport');

//Exposed module
module.exports = function(app) {
	//Post to '/users' to create a user, 
	//Get to get JSON for all users
	app.route('/api/users')
		.post(users.create)
		.get(users.list);
	//Get using request param 'userId' to retrieve JSON for one user
	//Put to update an existing user
	//Delete to delete an existing user
	app.route('/api/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete);
	//Get to retrieve registration page
	//Post to register a user
	app.route('/register')
		.get(users.renderRegister)
		.post(users.register);
	//Get to retrieve login page
	//Post to authenticate user locally and redirect them
	app.route('/login')
		.get(users.renderLogin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		}));
	//Get to login user using facebook OAuth
	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/login',
		scope: ['email']
	}));

		//Callback for user login using facebook OAuth
		app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
			failureRedirect: '/login',
			successRedirect: '/',
			scope: ['email']
		}));

	//Get to logout user
	app.get('/logout', users.logout);


	//Request Params
	app.param('userId', users.userByID);


}
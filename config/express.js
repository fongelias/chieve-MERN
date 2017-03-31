//Dependency Injection
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

//Exposed module
module.exports = function() {
	//Initializes express application
	var app = express();

	//Settings for bodyParser
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	//Set bodyParser to read json
	app.use(bodyParser.json());

	//Use express-session module
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'OurSuperSecretCookieSecret'
	}));

	//Enable Connect-Flash for temporary messages in session object
	app.use(flash());

	//Enable Passport for authentication
	app.use(passport.initialize());
	app.use(passport.session());

	//Enable tempating with ejs
	app.set('views', './app/views/ejs/');
	app.set('view engine', 'ejs');

	//require routing file and pass the application instance through it.
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/tasks.server.routes.js')(app);
	require('../app/routes/goals.server.routes.js')(app);
	//Set location of static assets
	app.use(express.static('./public'));

	return app;
}
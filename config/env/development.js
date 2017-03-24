//Env Variables
var port = 1337;
var dbUri = 'mongodb://localhost/todos';
//Facebook Variables
//Settings here:  https://developers.facebook.com/
var clientID = '399301507087870';
var clientSecret = '483fa47bb5cb9a13e524f5f2799ba885';
//Twitter Variables
//Settings here: https://apps.twitter.com/



//Exposed Module
module.exports = {
	port: port,
	db: dbUri,
	facebook: {
		clientID: clientID,
		clientSecret: clientSecret,
		callbackURL: 'http://localhost:' + port + '/oauth/facebook/callback'
	}
};





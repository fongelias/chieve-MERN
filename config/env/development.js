//Facebook Variables
//Settings here:  https://developers.facebook.com/
//Twitter Variables
//Settings here: https://apps.twitter.com/
var props = require('dotenv').config().parsed;


//Exposed Module
module.exports = {
	port: props.PORT,
	db: props.DB_URI,
	cookieSecret: props.COOKIE_SECRET,
	facebook: {
		clientID: props.FACEBOOK_CLIENT_ID,
		clientSecret: props.FACEBOOK_CLIENT_SECRET,
		callbackURL: 'http://localhost:' + props.PORT + '/oauth/facebook/callback'
	}
};
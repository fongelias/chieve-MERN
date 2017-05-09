//Exposed Module
module.exports = {
	port: process.env.PORT,
	db: process.env.MONGODB_URI, //Heroku mongolab
	cookieSecret: process.env.COOKIE_SECRET,
	facebook: {
		clientID: process.env.FACEBOOK_CLIENT_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: 'http://localhost:' + process.env.PORT + '/oauth/facebook/callback'
	}
};
//Determine environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Dependency Injection
var config = require('./config/config');
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');

//Instantiate
var db = mongoose();
var app = express();
var passport = passport();


app.listen(config.port);

//Exposed Module
module.exports = app;

console.log(process.env.NODE_ENV + 'server running at: '  + config.port);
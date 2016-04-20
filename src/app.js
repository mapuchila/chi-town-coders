'use strict';

var express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator'),
	flash = require('connect-flash'),
	session = require('express-session'),
	passport = require('passport'),
	localStrategy = require('passport-local').Strategy,
	mongo = require('mongodb'),
	mongoose = require('mongoose');
mongoose.connect((process.env.MONGOLAB_URI || 'mongodb://localhost:27017/sc3-coders'));
var db = mongoose.connection;

// Set Route
var routes = require('./routes/index');
var users = require('./routes/users');
var blog = require('./routes/blog');

// Initialize App
var app = express();

// View Engine
app.set('views', path.join(__dirname + '/templates'));
app.set('view engine', 'jade');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder (content accessable to the browser)
app.use('/static', express.static(__dirname + '/public'));

// Express Session 
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'), 
      	root = namespace.shift(), 
      	formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash Middleware
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// Setting Up Routes
app.use('/', routes);
app.use('/users', users);
app.use('/blog', blog);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
	console.log("The frontend server is running on port " + app.get('port') + "!");
});
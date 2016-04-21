'use strict';
var express = require('express'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var User = require('../users/models/user');

router.get('/sign-up', function(req, res){
	var path = req.path;
	res.locals.path = path;
	//console.log(path);
	res.render('users/sign-up');
});

router.post('/sign-up', function(req, res){
	var path = req.path;
	res.locals.path = path;

	var firstName = req.body['first-name'];
	var lastName = req.body['last-name'];
	var username = req.body['username'];
	var email = req.body['email'];
	var password = req.body['password'];
	var confirmPassword = req.body['password-confirm'];
	//console.log(Object.keys(req.body));

	req.checkBody('first-name', 'First Name is Required.').notEmpty();
	req.checkBody('first-name', 'First Name cannot contain numbers.').isAlpha();
	req.checkBody('last-name', 'Last Name is Required.').notEmpty();
	req.checkBody('last-name', 'Last Name cannot contain numbers.').isAlpha();
	req.checkBody('username', 'Hacker Name is Required.').notEmpty();
	req.checkBody('email', 'Email is Required.').notEmpty();
	req.checkBody('email', 'Email is not valid.').isEmail();
	req.checkBody('password', 'Password is Required.').notEmpty();
	req.checkBody('password-confirm', 'Passwords do not match!').equals(req.body['password']);

	var errors = req.validationErrors();
	//
	if(errors) {
		//console.log(errors);
		res.render('users/sign-up', {
			errors: errors
		});
	} else {
		var newUser = new User({
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			password: password
		});
		User.createUser(newUser, function(err, user) {
			if(err) throw err;
			console.log(user);
		});
		req.flash('success_msg', 'Congradulations on becoming a part of the SC3 community!');

		res.redirect('/users/sign-in');
	}
});

router.get('/sign-in', function(req, res){
	var path = req.path;
	res.locals.path = path;
	res.render('users/sign-in');
});

passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
	User.getUserByEmail(email, function(err, user){
	   	if(err) throw err;
	   	if(!user){
	   		return done(null, false, {message: 'Unknown User'});
	   	}

	   	User.comparePassword(password, user.password, function(err, isMatch){
	   		if(err) throw err;
	   		if(isMatch){
	   			return done(null, user);
	   		} else {
	   			return done(null, false, {message: 'Invalid password'});
	   		}
	   	});
   	});
}));

passport.serializeUser(function(user, done) {
  	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
	    done(err, user);
	});
});

router.post('/sign-in',
  	passport.authenticate('local', {
	  	successRedirect: '/', 
	  	failureRedirect:'/users/sign-in', 
	  	failureFlash: true
  	}),
  	function(req, res) {
		var path = req.path;
		res.locals.path = path;
  		res.redirect('/');
  	}
);

module.exports = router;
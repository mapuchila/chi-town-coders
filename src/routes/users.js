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

	var firstName = req.body['txt-first-name'];
	var lastName = req.body['txt-last-name'];
	var username = req.body['txt-username'];
	var email = req.body['txt-email'];
	var password = req.body['txt-password'];
	var confirmPassword = req.body['txt-password-confirm'];
	//console.log(Object.keys(req.body));

	req.checkBody('txt-first-name', 'First Name is Required.').notEmpty();
	req.checkBody('txt-last-name', 'Last Name is Required.').notEmpty();
	req.checkBody('txt-username', 'Hacker Name is Required.').notEmpty();
	req.checkBody('txt-email', 'Email is Required.').notEmpty();
	req.checkBody('txt-email', 'Email is not valid.').isEmail();
	req.checkBody('txt-password', 'Password is Required.').notEmpty();
	req.checkBody('txt-password-confirm', 'Passwords do not match!').equals(req.body['txt-password']);

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
	//console.log(path);
	res.render('users/sign-in');
});

passport.use(new LocalStrategy( function(username, password, done) {
		User.getUserByUsername(username, function(err, user){
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
  	res.redirect('/');
  });

module.exports = router;
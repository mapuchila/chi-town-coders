'use strict';
var express = require('express');
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
	var email = req.body['txt-email'];
	var password = req.body['txt-password'];
	var confirmPassword = req.body['txt-password-confirm'];
	//console.log(Object.keys(req.body));

	req.checkBody('txt-first-name', 'First Name is Required.').notEmpty();
	req.checkBody('txt-last-name', 'Last Name is Required.').notEmpty();
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
			email: email,
			password: password
		});
		User.createUser(newUser, function(err, user) {
			if(err) throw err;
			console.log(user);
		});
		req.flash('success_msg', 'Congradulations on becoming a member of SC3!');

		res.redirect('/users/sign-in');
	}
});

router.get('/sign-in', function(req, res){
	var path = req.path;
	res.locals.path = path;
	//console.log(path);
	res.render('users/sign-in');
});

router.post('/sign-in', function(req, res){
	var path = req.path;
	res.locals.path = path;
	//console.log(path);
	res.render('users/sign-in');
});

module.exports = router;
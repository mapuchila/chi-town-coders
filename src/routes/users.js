'use strict';
var express = require('express'),
	fs = require('fs'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var forgot = require('password-reset')({
    uri : 'http://chi-town-coders.herokuapp.com/users/reset-password',
    from : 'auto@supreme-chi-town-coding-crew',
    host : 'chi-town-coders.herokuapp.com', 
    port : 25
});
//router.use(require('sesame')()); // for sessions

var User = require('../users/models/user');

router.use(forgot.middleware);

router.get('/sign-up', function(req, res){
	res.render('users/sign-up');
});

router.post('/sign-up', function(req, res){
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
	res.render('users/sign-in');
});

passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
	User.getUserByEmail(email, function(err, user){
	   	if(err) throw err;
	   	if(!user){
	   		return done(null, false, {message: 'Argh, that Email is swimming with the sharks!'});
	   	}

	   	User.comparePassword(password, user.password, function(err, isMatch){
	   		if(err) throw err;
	   		if(isMatch){
	   			return done(null, user);
	   		} else {
	   			return done(null, false, {message: 'Argh, that Password is no good!'});
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
  	}
);

router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success_msg', 'Thank you, come again!');

	res.redirect('/users/sign-in');
});

router.get('/reset-password', function(req, res) {

	res.render('users/reset-password', {success_msg: 'Under construction, please come again!'});
});


// Password-Reset (start)
router.get('/forgot', function (req, res) {
	res.render('users/forgot');
});

router.post('/forgot', function (req, res) {
    var email = req.body.email;
    var reset = forgot(email, function (err) {
        if (err) {
        	res.end('Error sending message: ' + err);
			//res.render('users/forgot', {error_msg: 'Error sending message: ' + err});
        } else {
        	res.end('Check your inbox for a password reset message.');
			//res.render('users/reset-password', {success_msg: 'Check your inbox for a password reset message.'});
        }
    });

    reset.on('request', function (req_, res_) {
        req_.session.reset = { email : email, id : reset.id };
        fs.createReadStream(__dirname + '/users/forgot').pipe(res_);
		//res.render('users/reset-password', {success_msg: 'Under construction, please come again!'});
    });
});

router.post('/reset', function (req, res) {
    if (!req.session.reset) return res.end('reset token not set');

    var password = req.body.password;
    var confirm = req.body.confirm;
    if (password !== confirm) return res.end('passwords do not match');

    // update the user db here

    forgot.expire(req.session.reset.id);
    delete req.session.reset;
    res.end('password reset');
});
// Password-Reset (end)




router.get('/account', function(req, res) {
	res.render('users/account');
});

module.exports = router;
'use strict';

var User = require('./users/models/user');

var newUser = new User({
	firstName: 'marcin',
	lastName: 'test',
	username: 'test',
	password: '1',
	email: 'test@test.com'
});

User.createUser(newUser, function(err, user) {
	if(err) throw err;
	console.log(user);
});
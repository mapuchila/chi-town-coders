var mongoose = require('mongoose'),
	bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		default: ""
	},
	lastName: {
		type: String,
		default: ""
	},
	username: {
		type: String,
		default: "Anonymous"
	},
	password: {
		type: String
	},
	email: {
		type: String,
		index: true
	},
	access: {
		type: String,
		default: 'user'
	},
	createdDate: { 
		type: Date, 
		default: Date.now,
		index: true
	},
	role: {
		type: String,
		default: ""
	},
	primCode: {
		type: String,
		default: ""
	},
	image: {
		type: String,
		default: ""
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
};

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};

module.exports.getUserSliderInfo = function(callback){
	var criteria = {
		firstName:1, 
		lastName:1, 
		username:1, 
		role:1, 
		image:1,
		primCode:1,
		createdDate:1
	};

	User.find({}, criteria, callback).sort( { createdDate: -1 } );
};
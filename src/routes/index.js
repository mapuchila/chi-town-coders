var express = require('express');
var router = express.Router();
var User = require('../users/models/user');

// Home page
router.get('/', function(req, res) {
	// Pull users, first and last name, username, role and primary coding language.
	User.getUserSliderInfo(function(error, members) {
		if(error) {
			res.render('index', {error: error});
		} else {
			res.render('index', {members: JSON.stringify(members)});
		}
	});
});

// Can be used to ensure authentication.
// Example:
//router.get('/', ensureAuthenticated, function(req, res){
//	res.render('index');
//});
function ensureAuthenticated(req, res, next) {
	if(req.isAuthenicated()) {
		return next();
	} else {
		req.flash('error_msg', 'You are not signed in.');
		res.redirect('/users/sign-in');
	}
}

module.exports = router;
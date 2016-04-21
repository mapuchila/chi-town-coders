var express = require('express');
var router = express.Router();

// Home page
router.get('/', function(req, res){
	res.render('index');
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
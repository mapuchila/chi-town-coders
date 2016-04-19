var express = require('express');
var router = express.Router();
//var path = require('path');

router.get('/sign-up', function(req, res){
	var path = req.path;
	res.locals.path = path;
	//console.log(path);
	res.render('users/sign-up');
});

router.get('/sign-in', function(req, res){
	var path = req.path;
	res.locals.path = path;
	//console.log(path);
	res.render('users/sign-in');
});

module.exports = router;
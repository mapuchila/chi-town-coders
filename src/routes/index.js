var express = require('express');
var router = express.Router();

// Home page
router.get('/', function(req, res){
	var path = req.path;
	res.locals.path = path;
	res.render('index');
});

module.exports = router;
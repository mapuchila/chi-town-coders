'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

var postsLists = Object.keys(posts).map(function(value) {
							         return posts[value]})

var app = express();

app.use('/static', express.static(__dirname + '/public'))

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

require('./database');

app.get('/', function(req, res){
	var path = req.path;
	res.locals.path = path;
	res.render('index');
});

app.get('/blog/:title?', function(req, res){ 
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.render('blog', {posts: postsLists})
	} else {
		var post = posts[title] || {};
		res.render('post', { post: post});
	}
});

app.get('/posts', function(req, res) {
	if (req.query.raw) {
		res.json(posts);
	} else {
		res.json(postsLists);
	}
});

app.get('/sign-up', function(req, res){
	var path = req.path;
	res.locals.path = path;
	//console.log(path);
	res.render('users/sign-up');
});

app.get('/sign-in', function(req, res){
	var path = req.path;
	res.locals.path = path;
	//console.log(path);
	res.render('users/sign-in');
});

app.listen(app.get('port'), function() {
	console.log("The frontend server is running on port " + app.get('port') + "!");
});

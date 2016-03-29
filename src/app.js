'use strict';

var express = require('express'),
	posts = require('./mock/posts.json');
var postList = Object.keys(posts).map(function(value){ 
		return posts[value];
	});

var app = express();
// app.use adds middleware to the app.
app.use('/static', express.static(__dirname + '/public'));
// app.set adds app variables
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(request, response) {
	var path = request.path;
	console.log(path);
	response.locals.path = path;
	response.render('index');
});

app.get('/blog/:title?', (req, res) => {

	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.render('blog', {posts: postList});
	} else {
		var post = posts[title] || {};
		res.render('post', {post: post});
	}
});

app.get('/posts', function(req, res) {
	if(req.query.raw) {
		res.json(posts);
	} else {
		res.json(postList);
	}
});

app.listen(3000, function() {
	console.log("The front-end server is running on port 3000!");
});
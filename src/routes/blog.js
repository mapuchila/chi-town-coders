var express = require('express');
var router = express.Router();
var posts = require('../mock/posts.json');

var postsLists = Object.keys(posts).map(function(value) {
							         return posts[value];
							     	});

router.get('/:title?', function(req, res){ 
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.render('blogs/blog', {posts: postsLists})
	} else {
		var post = posts[title] || {};
		res.render('post', { post: post});
	}
});

router.get('/posts', function(req, res) {

	if (req.query.raw) {
		res.json(posts);
	} else {
		res.json(postsLists);
	}
});

module.exports = router;
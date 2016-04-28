var express = require('express');
var router = express.Router();
var posts = require('../mock/posts.json');
var Post = require('../blogs/models/post');
var Comment = require('../blogs/models/comment');

router.get('/create-post', function(req, res) {
    res.render('blogs/create-post', { locals: {
        title: 'New Post'
    }
    });
});

router.post('/create-post', function(req, res){

	var title = req.body['title'],
		post = req.body['post'];

	req.checkBody('title', 'Title is Required.').notEmpty();
	req.checkBody('post', 'Post Content is Required.').notEmpty();

	var errors = req.validationErrors();
	//
	if(errors) {

		res.locals.title = title;
		res.locals.post = post;
		res.render('blogs/create-post', {
			errors: errors
		});

	} else {
		console.log(post);
		var newPost = new Post({
			title: title,
			body: post,
			writerId: req.user._id
		});

		Post.createPost(newPost, function(err, user) {
			if(err) throw err;
			console.log(post);
		});
        res.redirect('/blog');
    }
});

router.get('/posts', function(req, res) {
	// Displays posts JSON
	Post.getAllPosts(function(postArray) {
		res.json(postArray);
	});
});

router.get('/:id?', function(req, res){ 
	var id = req.params.id;

	if (id === undefined) {
		Post.getAllPosts(function(postArray) {
			res.render('blogs/blog', {posts: postArray});
		});
	} else {
		Post.getPostById(id, function(post) {
			//res.json(post);
			res.render('blogs/post', { post: post});
		});
	}
});

router.post('/add-comment/:id?', function(req, res) {
	var id = req.params.id;

	var comment = req.body['comment'];

	req.checkBody('comment', 'Comment is required.').notEmpty();

	var errors = req.validationErrors();
	if(errors) {
		res.locals.comment = comment;
		Post.getPostById(id, function(post) {
			res.render('blogs/post', { post: post, errors: errors});
		});
	} else {
		//console.log(req.user.username);
		var newBlogComment = {
			comment: comment,
			username: req.user.username
		};
		// Having issues saving this add comment feature. :/
		Post.addComment(id, newBlogComment, function(err, comment) {
			//if(err) throw err;
			console.log(err);
			console.log(comment);
			Post.getPostById(id, function(post) {
				res.render('blogs/post', { post: post, errors: errors});
			});
		});

	}
});

module.exports = router;
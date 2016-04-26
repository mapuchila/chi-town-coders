var express = require('express');
var router = express.Router();
var posts = require('../mock/posts.json');
var Post = require('../blogs/models/post');

var postsLists = Object.keys(posts).map(function(value) {
							         return posts[value];
							     	});





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
			id: req.user._id
		});

		Post.createPost(newPost, function(err, user) {
			if(err) throw err;
			console.log(post);
		});
        res.redirect('/blog');
    }
});





router.get('/:id?', function(req, res){ 
	var id = req.params.id;

	if (id === undefined) {
		Post.getAllPosts(function(postArray) {
			res.render('blogs/blog', {posts: postArray});
		});

	} else {
		Post.getPostById(id, function(post) {
			//console.log(post);
			res.render('blogs/post', { post: post});
		});
		//var post = posts[id] || {};
	}
});

router.get('/posts', function(req, res) {

	if (req.query.raw) {
		res.json(posts);
	} else {
		res.json(postsLists);
	}
});




/*router.get('/blog/:id', function(req, res) {
    articleProvider.findById(req.params.id, function(error, article) {
        res.render('blog_show.jade',
        { locals: {
            title: article.title,
            article:article
        }
        });
    });
});
*/















module.exports = router;
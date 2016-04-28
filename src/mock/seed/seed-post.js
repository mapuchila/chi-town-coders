'use strict';

var Post = require('../../blogs/models/post');

var newPost = new Post({
	title: 'Seeded Post',
	body: 'Seed test post.',
	writerId: 23453,
	comments: [{}]
});

Post.createPost(newPost, function(err, user) {
	if(err) throw err;
	console.log(user);
});
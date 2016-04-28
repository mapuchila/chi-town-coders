'use strict';

var Comment = require('../../blogs/models/comment');
var Post = require('../../blogs/models/post');

var newBlogComment = {
	comment: 'this is a seeded comment',
	username: 'test'
};
//needs to change for the post this is being seeded to.
var postID = "57218e6a70203e232677b99d"; 
var username = "frank";

Post.addComment(postID, newBlogComment, function(err, comment) {
	if(err) throw err;
	//console.log(comment);
});
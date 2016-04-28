'use strict';

var Comment = require('../../blogs/models/comment');
var Post = require('../../blogs/models/post');

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var newBlogComment = {
	comment: 'this is a seeded comment',
	username: 'test',
	createdDate: Date.now,
	_id: mongoose.Types.ObjectId()
};
//needs to change for the post this is being seeded to.
var postID = "57219e763915161d2b6b8e16"; 

Post.addComment(postID, newBlogComment, function(err, data) {
	if(err) throw err;
	//console.log(data);
});
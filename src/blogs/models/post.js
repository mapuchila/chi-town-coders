var mongoose = require('mongoose');

var Comment = require('./comment');
var Schema = mongoose.Schema;
var db = mongoose.connection;

// Blog Schema
var PostSchema = mongoose.Schema({
	title: {
		type: String,
		default: ""
	},
	body: {
		type: String,
		default: ""
	},
	writerId: {
		type: Schema.Types.ObjectId
	},
	createdDate: { 
		type: Date, 
		default: Date.now,
		index: true
	},
	comments: [Comment.CommentSchema]
});

var Post = module.exports = mongoose.model('Post', PostSchema);

////////////////////////
// POST FUNCTIONALITY //
////////////////////////

module.exports.createPost = function(newPost, callback){
	// Saves new post to database.
	newPost.save(function(err, result) {
		if(err) {
			callback(error, null);
		} else {
			callback(null, result);
		}
	});
};

module.exports.getPostById = function(postID, callback){
	// Converts postID into an ObjectId to be used in the query.
	var id = require('mongodb').ObjectID(postID);
	db.collection('posts').findOne({ _id: id }, function(err, result){
		if (err) throw err;
		//console.log(result);
	  	callback(result);
	});
};

module.exports.getPostByTitle = function(title, callback){
	db.collection('posts').find({title: title},{title:1, body:1}, function(err, result){
		if (err) throw err;
		//console.log(result);
	  	callback(result);
	});
};

module.exports.getAllPosts = function(callback) {
	db.collection('posts').find({},{title:1, body:1}).sort({createdDate: -1}).toArray(function(err, results) {
		if (err) throw err;
	  	callback(results);
	});
};

module.exports.deletePostById = function(postId, callback) {
	var id = require('mongodb').ObjectID(postId);
	// Delete post functionality.
	db.collection('posts').remove({_id: id}, function(err, result) {
		if(err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

///////////////////////////
// COMMENT FUNCTIONALITY //
///////////////////////////

module.exports.addComment = function(postID, newComment, callback){
	// Converts postID into an ObjectId to be used in the query.
	var id = require('mongodb').ObjectID(postID);
	//	Sets an ObjectId for the comment.
	newComment._id = mongoose.Types.ObjectId();
	//console.log(newComment);

	db.collection("posts").update({ _id: id }, { "$push": { comments: newComment }}, function(err, result) {
		if( err ) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};

module.exports.deleteCommentById = function(commentId, callback) {
	var id = require('mongodb').ObjectID(commentId);
	// Delete comment functionality.
	db.collection('posts').update({}, { $pull: { comments: { _id: id } } }, function(err, result) {
		if(err) {
			callback(err, null);
		} else {
			callback(null, result);
		}
	});
};
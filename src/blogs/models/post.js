var mongoose = require('mongoose');

var Comment = require('./comment');

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
		type: Number
	},
	createdDate: { 
		type: Date, 
		default: Date.now,
		index: true
	},
	comments: Comment.CommentSchema
});

var Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.createPost = function(newPost, callback){
	newPost.save(callback);
};

module.exports.getPostById = function(id, callback){
	var id = require('mongodb').ObjectID(id);
	db.collection('posts').findOne({ _id: id }, {title:1, body:1}, function(err, result){
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
	db.collection('posts').find({},{title:1, body:1}).toArray(function(err, results) {
		if (err) throw err;
	  	callback(results);
	});
};


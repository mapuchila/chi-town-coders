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
		type: String
	},
	createdDate: { 
		type: Date, 
		default: Date.now,
		index: true
	},
	comments: [{
		username: {
			type: String,
			default: "Anonymous"
		},
		comment: {
			type: String,
			default: ""
		},
		createdDate: { 
			type: Date, 
			default: Date.now,
			index: true
		}
	}]
});

var Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.createPost = function(newPost, callback){
	newPost.save(callback);
};
module.exports.addComment = function(postID, newComment, callback){
	var id = require('mongodb').ObjectID(postID);

	db.collection("posts").update({ _id: id }, { "$push": { comments: newComment }}, function(err, result) {
		if( err ) {
			callback(err);
		} else {
			callback(null, result);
		}
	});
};

module.exports.getPostById = function(id, callback){
	var id = require('mongodb').ObjectID(id);
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


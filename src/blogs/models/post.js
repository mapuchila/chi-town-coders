var mongoose = require('mongoose');

var Comment = require('./comment')

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
	//comments: Comment.Comment
});

var Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.createPost = function(newPost, callback){
	newPost.save(callback);
};

module.exports.getPostById = function(id, callback){
	Post.findById(id, callback);
};

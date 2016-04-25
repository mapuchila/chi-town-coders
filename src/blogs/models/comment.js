var mongoose = require('mongoose');

// Comment Schema
var CommentSchema = mongoose.Schema({
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
});

var Comment = module.exports = mongoose.model('Comment', CommentSchema);

module.exports.createComment = function(newComment, callback){

};

module.exports.getCommentById = function(id, callback){
	Post.findById(id, callback);
};
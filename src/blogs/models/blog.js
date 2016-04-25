var mongoose = require('mongoose');

// Blog Schema
var BlogSchema = mongoose.Schema({
	title: {
		type: String,
		default: ""
	},
	body: {
		type: String,
		default: ""
	},
	comments: {
		type: Array
	},
	createdDate: { 
		type: Date, 
		default: Date.now,
		index: true
	}
});

var Blog = module.exports = mongoose.model('Blog', UserSchema);

module.exports.createBlog = function(newBlog, callback){

};

module.exports.getBlogById = function(id, callback){
	Blog.findById(id, callback);
};
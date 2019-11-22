const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
	title:{
		type:String,required:true
	},
	content:String,
	author:{
		type: String,
		maxLength:10,trim:true,
		uppercase:true
	},
	tags:[{
		type:String,lowercase:true
	}],
	views:{
		type:Number,
		default:0,
		min:0
	}
});

module.exports = mongoose.model("article",ArticleSchema);
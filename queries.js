const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/Test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(()=>{
	console.log("------连接成功!------");
}).catch(e=>{
	console.log("连接异常");
});

const Article = require("./models/ArticleModel");

//initial data
async function initial(){
	Article.create({
		title:`Leaf${parseInt(Math.random()*100)}`,
		content:"rocket",
		author:"zheling",
		tags:["js","nodeJs"],
		views:parseInt(Math.random()*1000)
	},function (err,doc) {
		if (err)return console.log(err);
		console.log(doc);
	});
}
// initial();

//1.$where : where + MongoDB operators($lt/$gt...)无法满足查询需求时才用$where,因为查询效率不如前者
async function $whereQuery() {
	Article.$where(function () {
		return this.author === "ZHELING"
	}).exec(function (err,result) {
		if (err) return err;
		console.log(result);
	})
	//$where(`this.author === "ZHELING" || this.author === "zheling"`)
}
// $whereQuery();

//2.all
async function allQuery() {
	try {
		let result = await Article.find().where("tags").all(["nodejs","js"]).select("tags _id");
		console.log(result);
	}catch (e) {
		return console.log(e);
	}
}
// allQuery();

//3.and
async function andQuery() {
	Article.find().and([{author: "zheling"},{content:"rocket"}]).exec(function (err,res) {
		if (err)return err;
		console.log(res);
	})
}
// andQuery();

//4.count
async function countQuery() {
	Article.find().countDocuments({content:"rocket"},function (err,res) {
		if (err)return err;
		console.log(res);
	})
}
// countQuery();

//5.deleteOne / deleteMany

//6.distinct
async function distinctQuery() {
	Article.find().distinct("content",function (err,res) {
		if (err)return err;
		console.log(res);
	})
}
// distinctQuery();

//7.equals
// User.where('age').equals(49);
// User.where('age', 49);

//8.find
async function findQuery() {
	Article.find({views:{
			$gte:300,
			$lte:400
		}},function (err,res) {
		console.log(res);
	})
}
// findQuery();

//9.findOneAndRemove
async function findOneAndReomveQuery() {
	Article.findOneAndDelete({content:"rocket"},function (err,res) {
		console.log(res);
	});
}
// findOneAndReomveQuery();

//10.findOneAndReplace
//find and replace with new data, but keep the ObjectId same
async function findOneAndReplaceQuery() {
	Article.where().findOneAndReplace({title:"Leaf56"},{title:"呵呵"},function (err,res) {
		console.log(res);
	});
}
// findOneAndReplaceQuery();

//11.findOneAndUpdate
async function findOneAndUpdateQuery() {
	Article.findOneAndUpdate({title:"test"},{title:"fuckyou"},{
		useFindAndModify:false
	},function (err,res) {
		console.log(res);
	});
}
// findOneAndUpdateQuery();


//12.limit

//13.lt/gt : less than / greater than
//14.lte/gte : less than or equal / greater than or equal
//15.ne : not equal
//16.nin
//17.or / nor
//18.remove
//19.replaceOne
//20.select
//21.skip
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(()=>{
	console.log("------连接成功!------");
}).catch(e=>{
	console.log("连接异常");
});

const Models = require("./models/UserModel");

async function initialFakeData(){

	await Models.UserModel.create({
		name:`fire${(Math.random()*100).toFixed(2)}`,
		password:Math.random()*1000,

		eggs:"2",
		gender:"male",

		// fullname: {
		// 	first: "firstName",
		// 	last: "lastName"
		// }
		//  or
		fullname: new Models.NameModel({
			first:"hello",
			last:"songs+"
		})
	},function (err,item) {
		if(err) console.log(err);
		console.log("saved !");
	});

}
// initialFakeData();

async function initialFakeDataWithInstance(){
	let name = new Models.NameModel({
		first:"hello",
		last:"songs"
	});
	name.save(function (err,result) {
		if(err) console.log(err);
		console.log(result,"saved name object");
	})
}
// initialFakeDataWithInstance();

async function deleteAll(){
	await Models.UserModel.deleteMany({},function (err,res) {
		console.log(err,res);
	});
}
// deleteAll();

async function classStaticMethods(){
	let staticRes = await Models.UserModel.findByName("zhe");
	console.log(staticRes);
}

async function queryHelperMethods() {
	let queryRes = await Models.UserModel.find().byNameQuery("guan");
	console.log(queryRes);
}
// queryHelperMethods();

async function virtualPath() {
	let user = await Models.UserModel.findOne({_id:"5d03615404a44842548b4b3b"});
	console.log(user.nameAndPwd); //access getter
	user.nameAndPwd = "guan weichang456";    //access setter
}

async function createByClass() {
	Models.UserModel.create(user,function (err,data) {
		if(err) console.log(err);
		console.log(data);
	});
}

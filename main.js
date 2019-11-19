var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const User = require("./models/UserModel");

//connect successfully or not
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
	console.log("------connect successfully!------");

	// initial some fake data ========================
	// User.create({
	// 	name:`zhe${Math.random()}`,
	// 	password:Math.random()*1000
	// },function (err,item) {
	// 	if(err) console.log(err);
	// 	//console.log(item,"saved !");
	// });


	// static method ========================
	// let staticRes = await User.findByName("zhe");
	// console.log(staticRes);


	//Query helper ========================
	// let queryRes = await User.find().byNameQuery("guan");
	// console.log(queryRes);


	//use virtuals to update ducoment ========================
	// let user = await User.findOne({_id:"5d03615404a44842548b4b3b"});
	// console.log(res.nameAndPwd); //access getter
	// user.nameAndPwd = "guan weichang456";    //access setter
	//
	// User.create(user,function (err,data) {
	// 	if(err) console.log(err);
	// 	console.log(data);
	// });

});
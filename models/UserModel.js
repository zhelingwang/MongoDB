var mongoose = require('mongoose');

//define a schema with properties and behaviors
const nameSchema = new mongoose.Schema({
	first:String,
	last:String
});
const userSchema = new mongoose.Schema({
	name: {
		type:"String",
		// unique:true //convenient helper for building MongoDB unique indexes
		validate:{
			validator:function (v) {
				return /^fire(\w)*/.test(v);
			},
			message:props=>`${props.value}前缀必须是fire!`
		}
	},
	fullname:{
		type:nameSchema,
		required: true
	},
	password: String,
	eggs:{
		type:Number,
		min:[2], max:12
	},
	gender:{
		type:"string",
		enum:["male","female"],
		required:true
	}
});

//add a plugin
userSchema.plugin(require("./../plugins/loadedAt"));

//define Class Static methods
userSchema.statics.findByName = function(name) {
	return this.find({ name: new RegExp(name, 'i') });
};

//define instance methods
userSchema.methods.greet = function () {
	return this.name
		? "My name is " + this.name
		: "I don't have a name";
};

//define Query helper , called by another Query method , not a static method
userSchema.query.byNameQuery = function(name) {
	return this.where({ name: new RegExp(name, 'i') });
};

// virtuals : setter and getter
userSchema.virtual('nameAndPwd').get(function () {
	return this.name + '--' + this.password;
}).set(function(v) {
	this.name = v.substr(0, v.indexOf(' '));
	this.password = v.substr(v.indexOf(' ') + 1);
});

//add some pre or post hooks
userSchema.pre("save",function (next) {
	// console.log("doing something before user save.........");
	// next();
	return next();  //no return will run followed code
	console.log("although this code after the next(),but it still will run");
});
userSchema.post("save",function (doc) {
	// console.log("doing something after user saved",doc._id);
});
//若不使用手动调用next(),可以采用新的语法,返回一个promise即可

//compile schema into model
//args : CollectionName(system change automatically) , schema , use custom name
//return a Model Class , 而UserModel/NameModel其一个别名而已
const UserModel = mongoose.model("user", userSchema,"user");
const NameModel = mongoose.model("name", nameSchema);

module.exports = {
	UserModel,
	NameModel
};
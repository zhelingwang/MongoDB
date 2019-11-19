var mongoose = require('mongoose');

//define a schema with properties and behaviors
var userSchema = new mongoose.Schema({
	name: String,
	password: String
});

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

//compile schema into model
//args : CollectionName(system change automatically) , schema , use custom name
const UserModel = mongoose.model("user", userSchema,"user");

module.exports = UserModel;
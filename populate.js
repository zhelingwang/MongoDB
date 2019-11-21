var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(()=>{
	console.log("------连接成功!------");
}).catch(e=>{
	console.log("连接异常");
});

const Person = require("./models/PersonModel.js");
const Story = require("./models/StoryModel.js");

async function initialFakeData(){
	let person = new Person({
		_id: new mongoose.Types.ObjectId(),
		name: 'guan weichang',
		age: 25
	});
	await person.save(function (err) {
		if(err) return console.log(err);
		console.log("saved person!",person._id);

		const story1 = new Story({
			title: 'Casino Royale',
			author: person._id    // assign the _id from the person
		});

		story1.save(function (err) {
			if (err) return console.log(err);
			console.log("story saved!");
		});

	});
}
// initialFakeData();

async function deleteAll(){
	Person.deleteMany({},function (err,res) {
		if (err) console.log(err);
		console.log("delete all",res);
	});

	Story.deleteMany({},function (err,res) {
		if (err) console.log(err);
		console.log("delete all",res);
	});
}
// deleteAll();

async function populateStory() {
	//populate 填充值是单个document的path
	Story.findOne({title: 'Casino Royale'}).populate("author").exec(function (err,story) {
		if(err) return console.log(err);
		console.log(story);
	})
}
// populateStory();

async function addStoryToPerson() {
	let query = Person.findOne({
		_id:"5dd60aa0e1b5458a7595aed5"
	});
	query.exec(async function (err,person) {
		if(err) return console.log(err);
		console.log("person---");

		//get story
		await Story.findOne({
			_id:"5dd60aa1e1b5458a7595aed6"
		},function (err,story) {
			if(err) return console.log(err);
			console.log(story,"====",story._id);
			//use s_id to update person stories
			person.stories.push(story._id);
			person.save(function (err,res) {
				if(err) return console.log(err);
				console.log(res,"update finished!");
			});
		})

	})
}
// addStoryToPerson();

async function populatePerson() {
	//populate 填充值是包含多个document的数组的path
	Person.findOne({}).populate("stories","title").exec(function (err,persons) {
		if(err) return console.log(err);
		console.log(persons);
	})
	// .populate({path:"stories",select:"title  -_id"})
}
populatePerson();
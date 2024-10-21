const mongoose = require("mongoose");



const teamSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	experience: [
		{
			type: String,
			required: true
		}
	],
	image_url: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model("TEAM", teamSchema)
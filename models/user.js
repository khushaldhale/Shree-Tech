const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	accountType: {
		type: String,
		required: true,
		enum: ["admin", "user"]
	}
})

module.exports = mongoose.model("USER", userSchema)
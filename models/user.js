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
	},
	services: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "SERVICE"
		}
	],
	team: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "TEAM"
		}
	],
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "PRODUCT"
		}
	]
})

module.exports = mongoose.model("USER", userSchema)
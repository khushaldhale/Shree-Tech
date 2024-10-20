const mongoose = require("mongoose");


const serviceSchema = new mongoose.Schema({
	service_name: {
		type: String,
		required: true
	},
	service_desc: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model("SERVICE", serviceSchema)
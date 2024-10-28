
const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
	product_name: {
		type: String,
		required: true
	},
	product_desc: {
		type: String,
		required: true
	},
	image_url: {
		type: String,
		//  required:true 
	}
})

module.exports = mongoose.model("PRODUCT", productSchema)
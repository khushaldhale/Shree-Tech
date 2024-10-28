const productSchema = require('../models/products');
const userSchema = require("../models/user")




exports.createProduct = async (req, res) => {
	try {

		const { product_name, product_desc } = req.body;
		const userId = req.decode._id;

		// const product_image = req.files.product_image; 


		if (!product_name || !product_desc) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide all details"
				})
		}

		// if (!product_image) {
		// 	return res.status(404)
		// 		.json({
		// 			success: false,
		// 			message: "kindly provide  an product image "
		// 		})
		// }

		// image is remained to add here 
		const product = await productSchema.create({ product_desc, product_name });
		const user = await userSchema.findByIdAndUpdate(userId, {
			$push: {
				products: product._id
			}
		}, { new: true })

		return res.status(200)
			.json({
				success: true,
				message: 'product is inserted succesfully',
				data: product
			})
	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: "Internal  error occured "
			})
	}
}


exports.getAllproducts = async (req, res) => {
	try {

		const response = await productSchema.find({});
		return res.status(200)
			.json({
				success: true,
				message: "all products are fetched succesfully ",
				data: response
			})

	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}


exports.deleteProduct = async (req, res) => {
	try {
		const productId = req.params.id
		const userId = req.decode._id
		if (!productId) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide an product id "
				})
		}

		const product = await productSchema.findByIdAndDelete(productId);
		const user = await userSchema.findByIdAndUpdate(userId, { $pull: { products: productId } }, { new: true })

		return res.status(200)
			.json({
				success: true,
				message: "product is deleted succesfully ",
				data: product
			})
	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: "internal error occured "
			})
	}
}
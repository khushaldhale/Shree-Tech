const cloudinary = require("cloudinary").v2



// cloduinary is working completely
const fileUpload = async (file, folder) => {
	try {
		const options = {
			folder
		}
		options.resource_type = "auto";
		const response = await cloudinary.uploader.upload(file.tempFilePath, options)
		return response.secure_url;
	}
	catch (error) {
		console.log(error)
	}
}

module.exports = fileUpload;
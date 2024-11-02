const cloudinary = require("cloudinary").v2;


const cloudinaryConnect = () => {
	try {
		cloudinary.config({
			api_key: "227766943769517",
			api_secret: "wjWXtlTRaHMjHE07SzZhs35Zm2Q",
			cloud_name: "dcavrask7"
		})

		console.log("cloudinary connected ")
	}
	catch (error) {
		console.log(error)
	}
}

module.exports = cloudinaryConnect

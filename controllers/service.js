const userSchema = require("../models/user");
const serviceSchema = require("../models/service");


exports.createService = async (req, res) => {
	try {
		const { service_name, service_desc } = req.body;
		const userId = req.decode._id

		if (!service_name || !service_desc) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide all details "
				})
		}

		const is_existing = await serviceSchema.findOne({ service_name });

		if (is_existing) {
			return res.status(404)
				.json({
					success: false,
					message: "service already exists, kidnly create a new "
				})
		}
		const service = await serviceSchema.create({ service_name, service_desc });
		const user = await userSchema.findByIdAndUpdate(userId, { $push: { services: service._id } });

		return res.status(200)
			.json({
				success: true,
				message: "service is created succefully ",
				data: service
			})
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}


exports.getAllServices = async (req, res) => {
	try {

		const services = await serviceSchema.find({});

		return res.status(200)
			.json({
				success: true,
				message: "services are fetched succesfully",
				data: services
			})

	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}



exports.deletService = async (req, res) => {
	try {

		const serviceId = req.params.id;
		const userId = req.decode._id;

		if (!serviceId) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide an service id "
				})
		}

		const service = await serviceSchema.findByIdAndDelete(serviceId);

		const user = await userSchema.findByIdAndUpdate(userId, { $pull: { services: service._id } }, { new: true })

		return res.status(200)
			.json({
				success: true,
				message: "service is deleted successfully",
				data: service
			})
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}

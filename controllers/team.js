const userSchema = require("../models/user");
const teamSchema = require("../models/team");



//  file handler and cloudinary code  is not done yet
exports.createTeam = async (req, res) => {
	try {

		const { fname, lname, position, experience } = req.body;
		const userId = req.decode._id

		const image = req.files.image;
		if (!fname || !lname || !position || !experience) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide all details "
				})
		}

		if (!image) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide an image "
				})
		}


		// have to upload image to cloudinary and  return the url 
		const team = await teamSchema.create({ fname, lname, position, experience, image_url });
		const user = await userSchema.findByIdAndUpdate(userId, { $push: { team: team._id } }, { new: true });

		return res.status(200)
			.json({
				success: true,
				message: "team member is  added successfully",
				data: team
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


exports.deleteTeam = async (req, res) => {
	try {

		const teamId = req.params.id;
		const userId = req.decode._id

		if (!teamId) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide an id of team member "
				})
		}

		// here we have to remove image from cloudinary also 

		const team = await teamSchema.findByIdAndDelete(teamId);
		const user = await userSchema.findByIdAndUpdate(userId, { $pull: { team: teamId } }, { new: true })


		return res.status(200)
			.json({
				success: true,
				message: "team member is deleted succefully",
				data: team
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



exports.updateTeam = async (req, res) => {
	try {

		const { fname, lname, position, experience } = req.body
		const teamId = req.params.id;
		const image = req.files.image;
		if (!teamId) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide team member id"
				})
		}

		if (!fname || !lname || !position || !experience) {
			return res.status(404)
				.json({
					success: false,
					message: "kidnly provide all details "
				})
		}
		if (!image) {
			return res.status(404)
				.json({
					success: false,
					message: "kidnly provide all image "
				})
		}

		// here we have to remove image from cloudinary first and  then add new image 

		//exception ,  what  if the image is already deleted from there

		const updatedTeam = await teamSchema.findByIdAndUpdate(teamId, { fname, lname, position, experience, image_url }, { new: true })

		return res.status(200)
			.json({
				success: true,
				message: "team member is updated succesfully",
				data: updatedTeam
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



exports.getAllTeam = async (req, res) => {
	try {

		const team = await teamSchema.find({});

		return res.status(200)
			.json({
				success: true,
				message: "team is fetched successfully ",
				data: team
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
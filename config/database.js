const mongoose = require("mongoose");
require("dotenv").config()

const dbConnect = () => {
	try {

		mongoose.connect(process.env.DATABASE_URL)
			.then((data) => {
				console.log("connection is established at : ", data.connection.host)
			})
			.catch((error) => {
				console.log("error occured while connecting to DB : ", error)
			})

	} catch (error) {
		console.log("error occured while connecting to DB")
		console.log(error)

	}
}
module.exports = dbConnect
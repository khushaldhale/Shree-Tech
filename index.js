const express = require("express");
const app = express()
require("dotenv").config()
app.use(express.json())



app.get("/", (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: "server is up and running"
		})
})

// db connection
const dbConnect = require("./config/database");
dbConnect()

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
	console.log("server is listening at PORT : ", PORT)
})
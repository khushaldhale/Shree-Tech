const express = require("express");
const app = express()
require("dotenv").config()


app.use(express.json())
const cookies = require("cookie-parser");
app.use(cookies())



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


// mapping the routes 
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);

const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/v1/services", serviceRoutes)

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
	console.log("server is listening at PORT : ", PORT)
})
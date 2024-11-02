const express = require("express");
const app = express()
require("dotenv").config()


app.use(express.json())
const cookies = require("cookie-parser");
app.use(cookies())
const cors = require("cors");
app.use(cors(
	{
		origin: "http://localhost:3000",
		credentials: true
	}
))

const fileUpload = require("express-fileupload");
app.use(fileUpload(
	{
		useTempFiles: true,
		tempFileDir: "/temp/"
	}
))



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

// cloduinary connection 
const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect()


// mapping the routes 
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);

const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/v1/services", serviceRoutes)

const teamRoutes = require("./routes/teamRoutes");
app.use("/api/v1/team", teamRoutes)

const productRoutes = require("./routes/productRoutes");
app.use("/api/v1/products", productRoutes)

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
	console.log("server is listening at PORT : ", PORT)
})
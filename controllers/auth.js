const userSchema = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()



exports.register = async (req, res) => {
	try {

		const { fname, lname, email, password, accountType } = req.body;

		if (!fname || !lname || !email || !password || !accountType) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide all details"
				})
		}

		const is_existing = await userSchema.findOne({ email });

		if (is_existing) {
			return res.status(404)
				.json({
					success: false,
					message: "you are already registered, kindly login"
				})
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const response = await userSchema.create({
			fname, lname, email, password: hashedPassword, accountType
		})

		return res.status(200)
			.json({
				success: true,
				message: "user is registered succesfully",
				data: response
			})
	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}

exports.login = async (req, res) => {
	try {

		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(404)
				.json({
					success: false,
					message: "kindly provide credentials"
				})
		}

		const is_existing = await userSchema.findOne({ email });

		if (!is_existing) {
			return res.status(404)
				.json({
					success: false,
					message: "you are not registered yet, kindly register first"
				})
		}

		if (await bcrypt.compare(password, is_existing.password)) {
			const accessToken = jwt.sign({
				_id: is_existing._id,
				accountType: is_existing.accountType
			},
				process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: "24h"
			})

			const refreshToken = jwt.sign({
				_id: is_existing._id,
				accountType: is_existing.accountType
			},
				process.env.REFRESH_TOKEN_SECRET, {
				expiresIn: "30d"
			})

			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
			})
				.status(200)
				.json({
					success: true,
					message: "you are succesfully logged in",
					data: is_existing,
					accessToken

				})

		}
	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}


exports.generateAccessToken = async (req, res) => {
	try {

		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401)
				.json({
					success: false,
					message: "kindly login and generate refresh token "
				})
		}


		const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

		//  means refresh token is  valid
		if (decode._id) {
			// access token generated
			const accessToken = jwt.sign(decode,
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: "24h"
				}
			)

			// access token generated  , send it to frontend to store it in redux
			res.status(200)
				.json({
					success: true,
					message: "new access token is generated ",
					accessToken
				})

		}
		else {
			// invalid access token so we have to generate new 
			return res.status(403)
				.json({
					success: false,
					message: "invalid  refresh token, kindly generate new"
				})
		}

	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}
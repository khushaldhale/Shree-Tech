const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.authentication = async (req, res, next) => {
	try {
		const header = req.headers['authorization'];
		const accessToken = header && header.split(" ")[1];

		if (!accessToken) {
			return res.status(401)
				.json({
					success: false,
					message: "kindly login "
				})
		}


		const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

		if (decode) {
			req.decode = decode
			next();
		}
		else {
			// now  we have to generate new access token  using refresh token 
			// that routing is handled at frontend
			return res.status(403)
				.json({
					success: false,
					message: "access token is invalid "
				})
		}

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
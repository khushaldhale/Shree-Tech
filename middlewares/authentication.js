const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.authentication = async (req, res, next) => {
	try {
		//  we are  not taking access token from  cookies  instead we are taking it from 
		// headers 
		const header = req.headers['authorization'];
		console.log(header)
		const accessToken = header && header.split(" ")[1];

		if (!accessToken) {
			return res.status(401)
				.json({
					success: false,
					message: "kindly login "
				})
		}

	

		const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decode) => {
			if (decode) {
				req.decode = decode
				next();
			}
			if (error) {
				// now  we have to generate new access token  using refresh token 
				// that routing is handled at frontend
				console.log("exceuted")

				return res.status(403)
					.json({
						success: false,
						message: "access token is invalid "
					})
			}
		});



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
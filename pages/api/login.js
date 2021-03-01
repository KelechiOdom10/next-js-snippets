const db = require("../../lib/db").instance;
import bcrypt from "bcrypt";
import jwtGenerator from "../../utils/jwtGenerator";
import cookie from "cookie";
import getHandler from "../../handlers";

const isProduction = process.env.NODE_ENV === "production";

export default getHandler().post(async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await db.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);

		if (user.length === 0) {
			res.status(403);
			res.json({
				status: "error",
				message: "User does not exist, please sign up!",
			});
			return;
		}

		const isValidPassword = await bcrypt.compare(
			password,
			user[0].hashed_password
		);

		if (!isValidPassword) {
			res.status(401);
			res.json({
				status: "error",
				message: "Invalid Credentials",
			});
			return;
		}
		const { id, username } = user[0];

		const jwtToken = jwtGenerator(id, username);
		const stringObj = JSON.stringify({ id, username });

		const token = `${jwtToken};${stringObj}`;

		res.setHeader(
			"Set-Cookie",
			cookie.serialize("auth", token, {
				domain: isProduction ? process.env.NEXT_PUBLIC_VERCEL_URL : "localhost",
				httpOnly: true,
				secure: isProduction,
				sameSite: isProduction ? "none" : true,
				maxAge: 3600,
				path: "/",
			})
		);

		res.status(201);
		res.json({
			status: "success",
			token: jwtToken,
		});
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

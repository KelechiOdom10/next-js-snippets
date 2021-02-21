const db = require("../../lib/db").instance;
import bcrypt from "bcrypt";
import jwtGenerator from "../../utils/jwtGenerator";
import getHandler from "../../handlers";

export default getHandler().post(async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const user = await db.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);

		if (user.length > 0) {
			res.status(401);
			res.json({
				status: "error",
				message: "User already exists!",
			});
			return;
		} else {
			const salt = await bcrypt.genSalt(10);
			const bcryptPassword = await bcrypt.hash(password, salt);

			const newUser = await db.query(
				"INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING *",
				[username, email, bcryptPassword]
			);

			const jwtToken = jwtGenerator(newUser[0].id, newUser[0].username);

			res.status(201);
			res.json({
				status: "success",
				token: jwtToken,
			});
		}
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

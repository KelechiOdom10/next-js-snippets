const db = require("../../lib/db").instance;
import bcrypt from "bcrypt";
import jwtGenerator from "../../utils/jwtGenerator";
import cookie from "cookie";
import { handler } from "../../handlers";

export default handler.post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const isValidPassword = bcrypt.compare(password, user[0].hashed_password);

    if (user.length === 0 || !isValidPassword) {
      res.status(401);
      res.json({
        status: "error",
        message: "Invalid Credentials",
      });
    }

    const jwtToken = jwtGenerator(user[0].id, user[0].username);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
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

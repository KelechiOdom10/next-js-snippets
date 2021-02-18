import cookie from "cookie";
import { handler } from "../../handlers";

export default handler.post(async (req, res) => {
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("auth", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			expires: new Date(0),
			sameSite: "strict",
			path: "/",
		})
	);
	res.status(200);
	res.json({ success: true, message: "Logged out successfully!" });
});

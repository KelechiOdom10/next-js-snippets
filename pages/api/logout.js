import cookie from "cookie";
import getHandler from "../../handlers";

const isProduction = process.env.NODE_ENV === "production";

export default getHandler().post(async (req, res) => {
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("auth", "", {
			domain: isProduction ? process.env.NEXT_PUBLIC_VERCEL_URL : "localhost",
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? "none" : "strict",
			expires: new Date(0),
			path: "/",
		})
	);
	res.status(200);
	res.json({ success: true, message: "Logged out successfully!" });
});

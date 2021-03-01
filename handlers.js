import cors from "cors";
import nextConnect from "next-connect";

const isProduction = process.env.NODE_ENV === "production";

export default function getHandler() {
	return nextConnect({
		onNoMatch(req, res) {
			res.status(405).json({
				status: "error",
				message: `Method ${req.method} Not Allowed`,
			});
		},
		onError(error, req, res) {
			res.status(501).json({ status: "error", message: error.message });
		},
	})
		.use(
			cors({
				origin: isProduction
					? [/.*next-js-snippets.*/]
					: "http://localhost:3000",
				exposedHeaders: ["set-cookie"],
				credentials: true,
			})
		)
		.options("*", cors());
}

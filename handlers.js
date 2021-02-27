import bodyParser from "body-parser";
import cors from "cors";
import nextConnect from "next-connect";

export default function getHandler() {
	return (
		nextConnect({
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
			.use(cors({ origin: [/.*next-js-snippets.*/], credentials: true }))
			// .options("*", cors())
			.use(bodyParser.urlencoded({ extended: false }))
	);
}

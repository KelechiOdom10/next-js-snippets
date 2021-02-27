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
			.use(function (req, res, next) {
				res.header("Access-Control-Allow-Origin", [/.*next-js-snippets.*/]);
				res.header(
					"Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept"
				);
				next();
			})
			// .use(cors({ origin: "*", credentials: true }))
			// .options("*", cors())
			.use(bodyParser.urlencoded({ extended: false }))
	);
}

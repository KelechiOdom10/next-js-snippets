import bodyParser from "body-parser";
import cors from "cors";
import nextConnect from "next-connect";

export default function getHandler() {
	return (
		nextConnect({
			onNoMatch(req, res) {
				res
					.status(405)
					.json({
						status: "error",
						message: `Method ${req.method} Not Allowed`,
					});
			},
			onError(error, req, res) {
				res.status(501).json({ status: "error", message: error.message });
			},
		})
			// .use(cors({ origin: [/.*next-js-snippets.*/], credentials: true, maxAge: 86400 }))
			.use((req, res, next) => {
				res.header("Access-Control-Allow-Origin", process.env.NEXT_URL);
				res.header(
					"Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept, Authorization"
				);
				if (req.method === "OPTIONS") {
					res.header(
						"Access-Control-Allow-Methods",
						"PUT, POST, PATCH, DELETE, GET"
					);
					return res.status(200).json({});
				}
				next();
			})
			.use(bodyParser.urlencoded({ extended: false }))
	);
}

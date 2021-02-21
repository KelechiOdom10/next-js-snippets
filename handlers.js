import bodyParser from "body-parser";
import nextConnect from "next-connect";

export default function getHandler() {
	return nextConnect({
		onNoMatch(req, res) {
			res
				.status(405)
				.json({ status: "error", message: `Method ${req.method} Not Allowed` });
		},
		onError(error, req, res) {
			res.status(501).json({ status: "error", message: error.message });
		},
	}).use(bodyParser.urlencoded({ extended: false }));
}

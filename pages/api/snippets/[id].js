const db = require("../../../lib/db").instance;
import nc from "next-connect";
import getHandler from "../../../handlers";
import { authorize } from "../../../middleware/authorize";

const authorization = nc()
	.put("/api/snippets/:id", authorize)
	.delete("/api/snippets/:id", authorize);

export default getHandler()
	.use(authorization)
	.get(async (req, res) => {
		const { id } = req.query;
		try {
			const snippet = await db.query("SELECT * FROM snippet WHERE id = $1", [
				id,
			]);
			res.status(200);
			res.json({ status: "success", data: snippet[0] });
		} catch (error) {
			res.status(400);
			throw new Error(error);
		}
	})
	.delete(async (req, res) => {
		const { id } = req.query;
		const user_id = req.user.id;
		try {
			const deletedSnippet = await db.query(
				"DELETE FROM snippet WHERE id = $1 and user_id = $2",
				[id, user_id]
			);

			if (deletedSnippet.length !== 0) {
				res.status(403).json({
					status: "error",
					message: "Not authorized to delete this snippet",
				});
				return;
			}

			res.status(200);
			res.json({
				status: "success",
				message: "Snippet successfully deleted",
			});
		} catch (error) {
			res.status(400);
			throw new Error(error);
		}
	})
	.put(async (req, res) => {
		const { id } = req.query;
		const user_id = req.user.id;
		try {
			const { name, description, language, code } = req.body;
			const updatedSnippet = await db.query(
				"UPDATE snippet SET name = $1, description = $2, language = $3, code =$4 WHERE id = $5 AND user_id = $6 RETURNING *",
				[name, description, language, code, id, user_id]
			);

			if (updatedSnippet.length === 0) {
				return res.status(403).json({
					status: "error",
					message: "Not authorized to edit this snippet",
				});
			}

			res.status(201);
			res.json({ status: "success", data: updatedSnippet[0] });
		} catch (error) {
			res.status(400);
			throw new Error(error);
		}
	});

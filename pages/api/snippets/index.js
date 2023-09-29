const db = require("../../../lib/db").instance;
import nc from "next-connect";
import getHandler from "../../../handlers";
import { authorize } from "../../../middleware/authorize";

const authorization = nc().post("/api/snippets", authorize);

export default getHandler()
  .use(authorization)
  .get(async (req, res) => {
    try {
      const snippets = await db.query("SELECT * FROM snippet");
      console.log({ snippets });
      res.status(200);
      res.json({ status: "success", data: snippets });
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  })
  .post(async (req, res) => {
    const user_id = req.user.id;
    try {
      const { name, description, language, code } = req.body;
      const snippet = await db.query(
        "INSERT INTO snippet (name, description, language, code, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, description, language, code, user_id]
      );
      res.status(201);
      res.json({ status: "success", data: snippet });
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  });

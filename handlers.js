import nextConnect from "next-connect";

export const handler = nextConnect({
  onNoMatch(req, res) {
    res
      .status(405)
      .json({ status: "error", message: `Method ${req.method} Not Allowed` });
  },
  onError(error, req, res) {
    res.status(501).json({ status: "error", message: error.message });
  },
});

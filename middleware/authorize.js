const jwt = require("jsonwebtoken");
const db = require("../lib/db").instance;

async function authorize(req, res, next) {
  let token;
  // Get token from header
  const { authorization } = req.headers;
  // Check if not token

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  } else if (req.cookies.auth) {
    token = req.cookies.auth;
  }

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "Not authorized to access this route",
    });
  }

  try {
    // Verify token
    //it is going to give use the user id (user:{id: user.id})
    const decoded = jwt.verify(token, process.env.SECRET);
    if (decoded) {
      const user = await db.query(
        "SELECT id, username FROM users WHERE id = $1",
        [decoded.user.id]
      );
      req.user = user[0];
      next();
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
}

module.exports = { authorize };

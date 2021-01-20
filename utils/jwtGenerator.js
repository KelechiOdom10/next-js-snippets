const jwt = require("jsonwebtoken");

function jwtGenerator(user_id, username) {
  const payload = {
    user: {
      id: user_id,
      username: username,
    },
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
}

module.exports = jwtGenerator;

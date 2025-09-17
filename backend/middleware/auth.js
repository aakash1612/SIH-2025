// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🔹 Auth Header Received:", authHeader); // 👈 debug log

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No Bearer token found");
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔹 Extracted Token:", token); // 👈 debug log

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified. Decoded payload:", decoded); // 👈 debug log

    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT Verify Error:", err.message); // 👈 debug log
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { verifyToken };

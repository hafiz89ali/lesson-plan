import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import database from "../database/connection.js";
dotenv.config();

async function isAuth(req, res, next) {
  const headers = req.headers;
  const token = headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const producedAt = new Date(decoded.iat * 1000);

    // Reject if token more than 1 day (24 hours)
    const now = new Date();
    const diff = now - producedAt;
    const diffInHours = diff / 1000 / 60 / 60;
    // Calculate the expiration time by using diffHours
    // const expirationTime = producedAt.setHours(producedAt.getHours() + 1);

    if (diffInHours > 1) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    // Check if user is valid in the database
    const query = `
        SELECT * FROM users WHERE id = $1 AND email = $2 AND username = $3
        `;
    const resDb = await database.query(query, [
      decoded.id,
      decoded.email,
      decoded.username,
    ]);

    if (resDb.rows.length === 0) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // IMPORTANT: Reassign req.user to the decoded token
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
}

export default isAuth;

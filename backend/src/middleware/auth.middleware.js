import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

const authMiddleware = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
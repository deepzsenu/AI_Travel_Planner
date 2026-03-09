import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const protect = (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    token = req.headers.authorization.split(" ")[1];

    try {

      const decoded = jwt.verify(token, config.jwtSecret);

      req.user = decoded;

      next();

    } catch (error) {

      return res.status(401).json({
        message: "Not authorized"
      });

    }

  } else {

    return res.status(401).json({
      message: "No token"
    });

  }

};
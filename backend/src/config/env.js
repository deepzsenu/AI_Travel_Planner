import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  openaiKey: process.env.OPENAI_API_KEY
};


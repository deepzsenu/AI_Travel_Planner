import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  BASEURL: process.env.BASEURL,
  MODEL: process.env.MODEL
};
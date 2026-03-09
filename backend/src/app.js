import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import tripRoutes from "./routes/trip.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (req, res) => {
  res.send("AI Travel Planner API running");
});

export default app;
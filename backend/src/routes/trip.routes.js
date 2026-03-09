import express from "express";

import {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip
} from "../controllers/trip.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createTrip);

router.get("/", protect, getUserTrips);

router.get("/:id", protect, getTripById);

router.put("/:id", protect, updateTrip);

router.delete("/:id", protect, deleteTrip);

export default router;
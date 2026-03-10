import express from "express";

import {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  generateItinerary,
  regenerateDay,
  tripChat
} from "../controllers/trip.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createTrip);

router.get("/", protect, getUserTrips);

router.get("/:id", protect, getTripById);

router.put("/:id", protect, updateTrip);

router.delete("/:id", protect, deleteTrip);

router.post("/:id/generate-itinerary", protect, generateItinerary);

router.post("/:id/regenerate-day", protect, regenerateDay);

router.post("/:id/chat", protect, tripChat);

export default router;
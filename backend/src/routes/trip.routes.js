import express from "express";

import {
  createTrip,
  getUserTrips,
  getTripById,
  deleteTrip,
  addActivity,
  removeActivity,
  regenerateDay,
  chatWithTrip 
} from "../controllers/trip.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTrip);

router.get("/", authMiddleware, getUserTrips);

router.get("/:id", authMiddleware, getTripById);

router.delete("/:id", authMiddleware, deleteTrip);

router.post("/:tripId/activity", authMiddleware, addActivity);

router.delete("/:tripId/activity/:activityId", authMiddleware, removeActivity);

router.post("/:tripId/regenerate-day", authMiddleware, regenerateDay);

router.post("/:tripId/chat", authMiddleware, chatWithTrip);

export default router;
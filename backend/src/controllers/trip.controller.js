import Trip from "../models/trip.model.js";
import {
  generateTripPlan,
  regenerateDayPlan,
  chatWithTripAI
} from "../services/ai.service.js";

import { safeJSONParse } from "../utils/safeJSONParse.js";
import { validateTripAIResponse } from "../utils/aiValidator.js";


// CREATE TRIP + GENERATE AI PLAN
export const createTrip = async (req, res) => {
  try {

    const userId = req.user.id;

    const { source, destination, days, budgetType, interests } = req.body;

    if (!source || !destination || !days) {
      return res.status(400).json({
        message: "Source, destination and days are required"
      });
    }

    const aiResponse = await generateTripPlan({
      source,
      destination,
      days,
      budgetType,
      interests
    });

    const parsed = safeJSONParse(aiResponse);

    const validated = validateTripAIResponse(parsed);

    const trip = await Trip.create({
      user: userId,
      source,
      destination,
      days,
      budgetType,
      interests,
      itinerary: validated.itinerary,
      estimatedBudget: validated.estimatedBudget,
      hotels: validated.hotels
    });

    res.status(201).json({
      message: "Trip generated successfully",
      trip
    });

  } catch (error) {

    console.error("CREATE TRIP ERROR:", error);

    res.status(500).json({
      message: "Failed to generate trip"
    });

  }
};


// GET ALL USER TRIPS
export const getUserTrips = async (req, res) => {

  try {

    const trips = await Trip.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(trips);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch trips"
    });

  }

};


// GET SINGLE TRIP
export const getTripById = async (req, res) => {

  try {

    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.json(trip);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch trip"
    });

  }

};


// DELETE TRIP
export const deleteTrip = async (req, res) => {

  try {

    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.json({
      message: "Trip deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete trip"
    });

  }

};


// ADD ACTIVITY
export const addActivity = async (req, res) => {

  try {

    const { tripId } = req.params;
    const { day, title, description, time } = req.body;

    const trip = await Trip.findOne({
      _id: tripId,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    const dayPlan = trip.itinerary.find(d => d.day === Number(day));

    if (!dayPlan) {
      return res.status(404).json({
        message: "Day not found"
      });
    }

    dayPlan.activities.push({
      title,
      description,
      time
    });

    await trip.save();

    res.json({
      message: "Activity added",
      itinerary: trip.itinerary
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to add activity"
    });

  }

};


// REMOVE ACTIVITY
export const removeActivity = async (req, res) => {

  try {

    const { tripId, activityId } = req.params;

    const trip = await Trip.findOne({
      _id: tripId,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    trip.itinerary.forEach(day => {
      day.activities = day.activities.filter(
        act => act._id.toString() !== activityId
      );
    });

    await trip.save();

    res.json({
      message: "Activity removed",
      itinerary: trip.itinerary
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to remove activity"
    });

  }

};


// REGENERATE DAY PLAN
export const regenerateDay = async (req, res) => {

  try {

    const { tripId } = req.params;
    const { day } = req.body;

    const trip = await Trip.findOne({
      _id: tripId,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    const aiResponse = await regenerateDayPlan({
      destination: trip.destination,
      day,
      interests: trip.interests
    });

    const parsed = safeJSONParse(aiResponse);

    trip.itinerary = trip.itinerary.map(d =>
      d.day === Number(day) ? parsed : d
    );

    await trip.save();

    res.json({
      message: "Day regenerated",
      itinerary: trip.itinerary
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to regenerate day"
    });

  }

};


// CHAT WITH TRIP AI (ONLY ANSWERS QUESTIONS)
export const chatWithTrip = async (req, res) => {

  try {

    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required"
      });
    }

    const trip = await Trip.findOne({
      _id: id,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    const aiReply = await chatWithTripAI({
      trip,
      message
    });

    res.json({
      reply: aiReply
    });

  } catch (error) {

    console.error("CHAT ERROR:", error);

    res.status(500).json({
      message: "Chat assistant failed"
    });

  }

};
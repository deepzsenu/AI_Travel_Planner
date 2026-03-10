import Trip from "../models/trip.model.js";
import { generateTravelPlan } from "../services/ai.service.js";
import { regenerateTripDay } from "../services/ai.service.js";
import { tripChatAssistant } from "../services/ai.service.js";
/*
CREATE TRIP
*/
export const createTrip = async (req, res) => {
  try {

    const { destination, days, budgetType, interests } = req.body;

    const trip = await Trip.create({
      user: req.user.id,
      destination,
      days,
      budgetType,
      interests
    });

    res.status(201).json(trip);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

export const getUserTrips = async (req, res) => {

  try {

    const trips = await Trip.find({
      user: req.user.id
    });

    res.json(trips);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


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
      message: "Server error"
    });

  }

};

export const updateTrip = async (req, res) => {

  try {

    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      req.body,
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    res.json(trip);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};

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
      message: "Server error"
    });

  }

};


/*
GENERATE AI ITINERARY
*/

export const generateItinerary = async (req, res) => {

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

    const aiResult = await generateTravelPlan(trip);

    trip.itinerary = aiResult.itinerary;
    trip.estimatedBudget = aiResult.estimatedBudget;
    trip.hotels = aiResult.hotels;

    await trip.save();

    res.json({
      message: "Itinerary generated successfully",
      trip
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "AI generation failed"
    });

  }

};

export const regenerateDay = async (req, res) => {

  try {

    const { day, instruction } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    const updatedDay = await regenerateTripDay(trip, day, instruction);

    trip.itinerary = trip.itinerary.map(d =>
      d.day === day ? updatedDay : d
    );

    await trip.save();

    res.json({
      message: "Day regenerated successfully",
      itinerary: trip.itinerary
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "AI regeneration failed"
    });

  }

};

export const tripChat = async (req, res) => {

  try {

    const { question } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    const answer = await tripChatAssistant(trip, question);

    // save conversation
    trip.chatHistory.push({
      role: "user",
      message: question
    });

    trip.chatHistory.push({
      role: "assistant",
      message: answer
    });

    await trip.save();

    res.json({
      answer
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Chat assistant failed"
    });

  }

};

// export const tripChat = async (req, res) => {

//   try {

//     const { question } = req.body;

//     const trip = await Trip.findOne({
//       _id: req.params.id,
//       user: req.user.id
//     });

//     if (!trip) {
//       return res.status(404).json({
//         message: "Trip not found"
//       });
//     }

//     const answer = await tripChatAssistant(trip, question);

//     res.json({
//       answer
//     });

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       message: "Chat assistant failed"
//     });

//   }

// };